import Promise from 'bluebird';
import getWeb3 from '../utils/getWeb3';
import { getTransactionReceiptMined, detectNetwork } from '../utils';



const Web3Service = () => {
    let web3;
    // 	_connected,
    // 	_balance,
    // 	_address,
    // 	_networkId,
    // 	_networkName;
    
    // let _loaded = false;
    
    function fetchBalance(addr) {
	if (!addr) {
	    return 0;
	}
	return web3.eth.getBalancePromise(addr);
    }
    
    async function setup(){
	// Get network provider and web3 instance.
	// See utils/getWeb3 for more info.	
	web3 = await getWeb3();
	if (!web3) {
	    throw new Error("Web3 is not connected");
	}
	Promise.promisifyAll(web3.eth, { suffix: "Promise" });
	web3.eth.getTransactionReceiptMined = getTransactionReceiptMined;
	console.log("got web3");
	
	const address = web3.eth.accounts[0];
	console.log("got address");
	const balance = await fetchBalance(address);
	const connected = web3.isConnected();
	const { networkName, networkId } = detectNetwork(web3);

	return {
	    web3,
	    balance,
	    address,
	    connected,
	    networkName,
	    networkId
	};
    }

    // api
    return {
	//isConnected: () => {return _connected && web3.eth.accounts.length > 0;},
	// getBalance: () => _balance,
	//getAddress: () => _address,
	//isLoaded: () => _loaded,
	//getNetworkId: () => _networkId,
	//getNetworkName: () => _networkName,
	//toWei: (n, k) => web3.toWei(n, k),
	//fromWei: (n, k) => web3.fromWei(n,k),
	//toBigNumber: (n) => web3.toBigNumber(n),
	getWeb3: () => web3,
	//getTransactionReceiptMined: (txHash) => web3.eth.getTransactionReceiptMined(txHash, 500),
	setup
    };
}


export default Web3Service();
