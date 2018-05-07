import web3Service from "../services/web3Service";
import escrowContract from "../services/eth2phone/escrowContract";
import * as actionTypes from './types';


const updateWeb3Details = (payload) => {
    return {
        type: actionTypes.UPDATE_WEB3_DETAILS,
        payload
    };
}


export const updateBalance = () => {
    return async (dispatch, getState) => {
	const state = getState();
	const address = state.web3Data.address;

	const web3 = web3Service.getWeb3();
	const balance = await web3.eth.getBalancePromise(address);
	console.log("got balance", balance)
	dispatch({
	    type: actionTypes.UPDATE_BALANCE,
	    payload: { balance } 
	});	
    }
}


export const setupWeb3 = (address) => {
    return async (dispatch, getState) => {
	try { 
	    const {
		web3,
		balance,
		address,
		connected,
		networkName,
		networkId
	    } = await web3Service.setup();

	    try { 
		await escrowContract.setup(web3);
	    } catch(err) {
		console.log("Error while setupping contract");
		console.log(err);
	    }

	    dispatch(updateWeb3Details({
		balance,
		address,
		connected,
		networkName,
		networkId
	    }));

	} catch(err) {
	    dispatch(updateWeb3Details({
		balance: null,
		address: null,
		connected: false,
		networkName: null,
		networkId: null
	    }));	    
	}	
    };
}
