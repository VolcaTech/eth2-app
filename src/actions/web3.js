import web3Service from "../services/web3Service";
import escrowContract from "../services/eth2phone/escrowContract";
import * as actionTypes from './types';


const updateWeb3Details = (payload) => {
    return {
        type: actionTypes.UPDATE_WEB3_DETAILS,
        payload
    };
}


export const setupWeb3 = (address) => {
    return async (dispatch, getState) => {
	const {
	    web3,
	    balance,
	    address,
	    connected,
	    networkName,
	    networkId
	} = await web3Service.setup();

	escrowContract.setup(web3);
	
	dispatch(updateWeb3Details({
	    balance,
	    address,
	    connected,
	    networkName,
	    networkId
	}));
    };
}
