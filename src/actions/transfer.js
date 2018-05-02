import web3Service from "../services/web3Service";
// import escrowContract from "../services/eth2phone/escrowContract";
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

const subscribePendingTransferMined = (transfer) => {
    return async (dispatch, getState) => {
	const web3 = web3Service.getWeb3();
	const txReceipt = await web3.eth.getTransactionReceiptMined(transfer.txHash);
	console.log("transaction mined!!");
	
	dispatch(updateTransfer({
	    status: 'sent',
	    id: transfer.id
	}));

	const state = getState();
	console.log({state});
    };
}


export const sendTransfer = ({phone,  phoneCode, amount}) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const senderAddress = state.web3Data.address;

	const { txHash, secretCode, transferId, transitAddress } = await e2pService.sendTransfer({phone, phoneCode, amountToPay: amount});	
	const id = `SEND-${txHash}-${transitAddress}`;

	const transfer = {
	    id,
	    txHash,
	    secretCode,
	    transferId,
	    transitAddress,
	    senderAddress,
	    status: 'pending',
	    receiverPhone: phone,
	    receiverPhoneCode: phoneCode,
	    timestamp: Date.now(),
	    amount,	    
	    fee: 0,
	    direction: 'out'
	};
	
	dispatch(createTransfer(transfer));

	// subscribe
	dispatch(subscribePendingTransferMined(transfer));
	
	return transfer;
    };
}


export const withdrawTransfer = ({phone,  phoneCode, secretCode, smsCode }) => {
    return async (dispatch, getState) => {
	
	const state = getState();
	const receiverAddress = state.web3Data.address;

	//const id = `SEND-${txHash}-${transitAddress}`;
	const result = await e2pService.verifyPhoneAndWithdraw({
	    phoneCode,
	    phone,
	    secretCode,
	    smsCode,
	    receiverAddress
	});

	console.log({result});
	// const transfer = {
	//     id,
	//     txHash,
	//     secretCode,
	//     transferId,
	//     transitAddress,
	//     status: 'pending',
	//     receiverPhone: phone,
	//     receiverPhoneCode: phoneCode,
	//     timestamp: Date.now(),
	//     amount,	    
	//     fee: 0,
	//     direction: 'in'
	// };
	
	// dispatch(createTransfer(transfer));

	// // subscribe
	// dispatch(subscribePendingTransferMined(transfer));	
	// return transfer;
    };
}
