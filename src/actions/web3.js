import web3Service from "../services/web3Service";
import * as actionTypes from './types';


const updateWeb3Details = (payload) => {
    console.log("disapatching", {payload});
    
    return {
        type: actionTypes.UPDATE_WEB3_DETAILS,
        payload
    };
}


export const setupWeb3 = (address) => {
    return async (dispatch, getState) => {
	console.log("setupping web3..");
	const {
	    web3,
	    balance,
	    address,
	    connected,
	    networkName,
	    networkId
	} = await web3Service.setup();
	dispatch(updateWeb3Details({
	    balance,
	    address,
	    connected,
	    networkName,
	    networkId
	}));
    };
}
