// import web3Service from "../services/web3Service";
// import escrowContract from "../services/eth2phone/escrowContract";
import * as e2pService from '../services/eth2phone';
import * as actionTypes from './types';


const createTransfer = (payload) => {
    return {
        type: actionTypes.CREATE_TRANSFER,
        payload
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

	return transfer;
    };
}
