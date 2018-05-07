import web3Service from "../services/web3Service";
import escrowContract from "../services/eth2phone/escrowContract";
import verificationUrlGetter from "../services/eth2phone/serverUrl";
import { detectNetwork } from '../utils';
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
	dispatch({
	    type: actionTypes.UPDATE_BALANCE,
	    payload: { balance } 
	});	
    }
}


export const setupWeb3 = () => {
    return async (dispatch, getState) => {
	try {
	    const web3Details = await web3Service.setup();
	    const {
		web3,
		balance,
		address,
		connected,
		networkName,
		networkId
	    } = web3Details;
	    
	    try { 
		await escrowContract.setup(web3);
		verificationUrlGetter.setNetwork(networkId);
	    } catch(err) {
		console.log("Error while setupping contract");
		console.log(err);
	    }

	    dispatch(updateWeb3Details(web3Details));

	} catch(err) {
	    console.log({err});
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


export const setupWeb3ChangeListener = () => {
    return (dispatch, getState) => {
	const state = getState();
	const oldAddress = state.web3Data.address;
	const oldNetworkId = state.web3Data.networkId;	
	const web3 = web3Service.getWeb3();
	
	var accountInterval = setInterval(async () => {
	    const address = web3.eth.accounts[0];
	    const {networkName, networkId } = detectNetwork(web3);
	    
	    if (oldAddress !== address || oldNetworkId !== networkId) {
		const balance = await web3.eth.getBalancePromise(address);
		dispatch(updateWeb3Details({
		    balance,
		    address,
		    connected: true,
		    networkName,
		    networkId
		}));	    
	    }
	}, 2000);
    };
}
