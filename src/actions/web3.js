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

const _setupContract = async (web3, networkId) => {
    try { 
	await escrowContract.setup(web3);
	verificationUrlGetter.setNetwork(networkId);
    } catch(err) {
	console.log("Error while setuping contract");
	console.log(err);
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

	    await _setupContract(web3, networkId);

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
	let oldAddress = state.web3Data.address;
	let oldNetworkId = state.web3Data.networkId;
	const connected = state.web3Data.connected;		
	const web3 = web3Service.getWeb3();
	
	var accountInterval = setInterval(async () => {
	    if (connected) { 
		const address = web3.eth.accounts[0];
		const { networkName, networkId } = detectNetwork(web3);
		
		if (oldAddress !== address || oldNetworkId !== networkId) {
		    let balance = 0;
		    if (address) {
		    	balance = await web3.eth.getBalancePromise(address);
		    }

		    await _setupContract(web3, networkId);
		    
		    dispatch(updateWeb3Details({
		    	balance,
		    	address,
		    	connected: true,
		    	networkName,
		    	networkId
		    }));
		    
		    oldAddress = address;
		    oldNetworkId = networkId;
		
		}
	    }
	}, 2000);					
    };
}
