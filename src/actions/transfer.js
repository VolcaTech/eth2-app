import web3Service from "../services/web3Service";
// import escrowContract from "../services/eth2phone/escrowContract";
import { getDepositingTransfers,
	 getReceivingTransfers,
	 getCancellingTransfers,
	 getTransfersForActiveAddress
       } from './../data/selectors';
import * as e2pService from '../services/eth2phone';
import * as actionTypes from './types';


const createTransfer = (payload) => {
    return {
        type: actionTypes.CREATE_TRANSFER,
        payload
    };
}


const updateTransfer = (payload) => {
    return {
        type: actionTypes.UPDATE_TRANSFER,
        payload
    };
}


const subscribePendingTransferMined = (transfer, nextStatus, txHash) => {
    return async (dispatch, getState) => {
	const web3 = web3Service.getWeb3();
	const txReceipt = await web3.eth.getTransactionReceiptMined(txHash || transfer.txHash);
	dispatch(updateTransfer({
	    status: nextStatus,
	    id: transfer.id
	}));	
    };
}


// find all pending transfers and update status when they will be mined
export const subscribePendingTransfers = () => {
    return  (dispatch, getState) => {
	const state = getState();
	const depositingTransfers = getDepositingTransfers(state);
	const receivingTransfers = getReceivingTransfers(state);
	const cancellingTransfers = getCancellingTransfers(state);		

	
	depositingTransfers.map(transfer => {
	    dispatch(subscribePendingTransferMined(transfer, 'deposited'));
	});
	receivingTransfers.map(transfer => {
	    dispatch(subscribePendingTransferMined(transfer, 'received'));
	});
	cancellingTransfers.map(transfer => {
	    dispatch(subscribePendingTransferMined(transfer, 'cancelled'));
	});	
	
    };
}


export const sendTransfer = ({phone,  phoneCode, amount}) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const senderAddress = state.web3Data.address;

	const { txHash, secretCode, transferId, transitAddress } = await e2pService.sendTransfer({phone, phoneCode, amountToPay: amount});
	const id = `${transferId}-out`;

	const transfer = {
	    id,
	    txHash,
	    secretCode,
	    transferId,
	    transitAddress: transitAddress.toLowerCase(),
	    senderAddress,
	    status: 'depositing',
	    receiverPhone: phone,
	    receiverPhoneCode: phoneCode,
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'out'
	};
	console.log({transfer});
	dispatch(createTransfer(transfer));

	// subscribe
	dispatch(subscribePendingTransferMined(transfer, 'deposited'));
	
	return transfer;
    };
}


export const withdrawTransfer = ({phone,  phoneCode, secretCode, smsCode }) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const receiverAddress = state.web3Data.address;
	
	const { txHash, transfer: transferFromServer, amount } = await e2pService.verifyPhoneAndWithdraw({
	    phoneCode,
	    phone,
	    secretCode,
	    smsCode,
	    receiverAddress
	});
	
	const id = `${transferFromServer.transferId}-IN`;
	const transfer = {
	    id,
	    txHash,
	    secretCode,
	    transferId: transferFromServer.transferId,
	    transitAddress: transferFromServer.transitAddress.toLowerCase(),
	    status: 'receiving',
	    receiverPhone: phone,
	    receiverPhoneCode: phoneCode,
	    receiverAddress,
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'in'
	};
	console.log({transfer});
	dispatch(createTransfer(transfer));

	// // subscribe
	dispatch(subscribePendingTransferMined(transfer, 'received'));	
	return transfer;
    };
}


export const cancelTransfer = (transfer) => {
    return async (dispatch, getState) => {
	
	console.log("cancelling transfer..");
	
	const txHash = await e2pService.cancelTransfer(transfer.transitAddress);
	console.log("cancelled", { txHash, transfer});

	dispatch(updateTransfer({
	    status: "cancelling",
	    id: transfer.id,
	    txHash
	}));	
	
	// // subscribe
	transfer.txHash = txHash;
	dispatch(subscribePendingTransferMined(transfer, 'cancelled'));	
	return transfer;
    };
}



export const fetchWithdrawalEvents = () => {
    return async (dispatch, getState) => {
	const state = getState();
	const address = state.web3Data.address;
	const lastChecked = 0;
	console.log("fetching withdrawals...", {lastChecked});
	const activeAddressTransfers = getTransfersForActiveAddress(state);
	console.log({activeAddressTransfers});
	try { 
	    const events = await e2pService.getWithdrawalEvents(address, lastChecked);
	    console.log({events});
	    events.map(event => {
		const { transitAddress, sender } = event.args;
		activeAddressTransfers
		    .filter(transfer =>
			    transfer.status === 'deposited' &&
			    transfer.transitAddress === transitAddress &&
			    transfer.senderAddress === sender
			   )
		    .map(transfer => {
			console.log("found transfer", {transfer});
			dispatch(updateTransfer({
			    status: "sent",
			    id: transfer.id
			}));				
		    });
	    });
	    
	} catch (err) {
	    console.log("Error while getting events", err);
	}
    };
}
