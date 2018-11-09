import web3Service from "../services/web3Service";
// import escrowContract from "../services/eth2phone/escrowContract";
import { getDepositingTransfers,
	 getReceivingTransfers,
	 getCancellingTransfers,
	 getTransfersForActiveAddress
       } from './../data/selectors';
import * as e2pService from '../services/eth2phone';
import * as actionTypes from './types';
import { updateBalance } from './web3';

const createTransfer = (payload) => {
    return {
        type: actionTypes.CREATE_TRANSFER,
        payload
    };
}

const createLinkTransfer = (payload) => {
    return {
        type: actionTypes.CREATE_LINK_TRANSFER,
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

	const isError = (!(txReceipt.status === "0x1" && txReceipt.logs.length > 0));
	dispatch(updateTransfer({
	    status: nextStatus,
	    isError,
	    id: transfer.id
	}));

	setTimeout(() => {
	    dispatch(updateBalance());
	}, 10000);
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
	const networkId = state.web3Data.networkId;	
	const senderAddress = state.web3Data.address;

	const { txHash, secretCode, transferId, transitAddress } = await e2pService.sendTransfer({phone,
												  phoneCode,
												  amountToPay: amount,
												  senderAddress});
	const id = `${transferId}-out`;

	const transfer = {
        id,
        verificationType: 'phone',
	    txHash,
	    secretCode,
	    transferId,
	    transitAddress: transitAddress.toLowerCase(),
	    networkId,
	    senderAddress,
        status: 'depositing',
	    receiverPhone: phone,
	    receiverPhoneCode: phoneCode,
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'out'
    };
    
    
	dispatch(createTransfer(transfer));

	// subscribe
	dispatch(subscribePendingTransferMined(transfer, 'deposited'));
	
	return transfer;
    };
}

export const sendSpecialLinkTransfer = ({amount}) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const networkId = state.web3Data.networkId;	
	const senderAddress = state.web3Data.address;
	
	const { txHash, transitPrivateKey, transferId, transitAddress } = await e2pService.sendLinkTransfer({
												  amountToPay: amount,
												  senderAddress});
	const id = `${transferId}-out`;

	const transfer = {
            id,
            verificationType: 'none',        
	    txHash,
	    transitPrivateKey,
	    transferId,
	    transitAddress: transitAddress.toLowerCase(),
	    networkId,
	    senderAddress,
            status: 'depositing',
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'out'
	};
    
	dispatch(createLinkTransfer(transfer));
	// subscribe
	dispatch(subscribePendingTransferMined(transfer, 'deposited'));
	
	return transfer;
    };
}


export const withdrawTransfer = ({phone,  phoneCode, secretCode, smsCode }) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const networkId = state.web3Data.networkId;
	const receiverAddress = state.web3Data.address;
	
	const { txHash, transferId, amount } = await e2pService.verifyPhoneAndWithdraw({
	    phoneCode,
	    phone,
	    secretCode,
	    smsCode,
	    receiverAddress
	});
	
	const id = `${transferId}-IN`;
	const transfer = {
        id,
        verificationType: 'phone',                
	    txHash,
	    secretCode,
	    transferId: transferId,
	    //transitAddress: transferFromServer.transitAddress.toLowerCase(),
	    status: 'receiving',
	    receiverPhone: phone,
	    receiverPhoneCode: phoneCode,
	    networkId,
	    receiverAddress,
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'in'
	};
	dispatch(createTransfer(transfer));

	// // subscribe
	dispatch(subscribePendingTransferMined(transfer, 'received'));	
	return transfer;
    };
}

export const withdrawLinkTransfer = ({transitPrivateKey}) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const networkId = state.web3Data.networkId;
	const receiverAddress = state.web3Data.address;
    
	const result = await e2pService.withdrawLinkTransfer({
            transitPrivateKey,
            receiverAddress
	});
	
	
	const id = `${result.transferId}-IN`;
	const txHash = result.txHash;
	const amount = result.amount;
	const transfer = {
            id,
            verificationType: 'none',                
	    txHash,
	    transferId: result.transferId,
	    status: 'receiving',
	    networkId,
	    receiverAddress,
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'in'
	};
	dispatch(createTransfer(transfer));

	// // subscribe
	dispatch(subscribePendingTransferMined(transfer, 'received'));	
	return transfer;
    };
}


export const cancelTransfer = (transfer) => {
    return async (dispatch, getState) => {

	const state = getState();
	
	// take contract redeploy into account
	let contractVersion;
	const contractRedeployTimestamp = 1529011666000;
	if (transfer.timestamp && transfer.timestamp < contractRedeployTimestamp) {
	    contractVersion = 1;
	}
	
	const txHash = await e2pService.cancelTransfer(transfer.transitAddress, contractVersion);

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
	const activeAddressTransfers = getTransfersForActiveAddress(state);
	try { 
	    const events = await e2pService.getWithdrawalEvents(address, lastChecked);
	    events.map(event => {
		const { transitAddress, sender } = event.args;
		activeAddressTransfers
		    .filter(transfer =>
			    transfer.status === 'deposited' &&
			    transfer.transitAddress === transitAddress &&
			    transfer.senderAddress === sender
			   )
		    .map(transfer => {
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
