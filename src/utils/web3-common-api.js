import Promise from "bluebird";
import getWeb3 from './getWeb3';
import verifiedProxyContractApi from "./verified-proxy-contract-api";

function detectNetwork(networkId) {
    var networkName;
    switch (networkId) {
    case "1":
	networkName = "Main";
	break;
    case "2":
	networkName = "Morden";
	break;
    case "3":
	networkName = "Ropsten";
	break;
    case "4":
	networkName = "Rinkeby";
	break;
    case "42":
	networkName = "Kovan";
	break;
    default:
	networkName = `Unknown network`;
    }
    return networkName;
}


function generateWeb3Api() {

    let web3,
	_connected,
	_balance,
	_address,
	_networkId,
	_networkName;
    
    let _loaded = false;
    
    function fetchBalance(addr) {
	if (!addr) {
	    return 0;
	}
	return web3.eth.getBalancePromise(addr);
    }
    
    function setup(){
	// Get network provider and web3 instance.
	// See utils/getWeb3 for more info.	
	return getWeb3 
	    .then(results => {		
		web3 = results.web3;
		Promise.promisifyAll(web3.eth, { suffix: "Promise" });
		return web3.eth.accounts[0];
	    })
	    .then(fetchBalance)
	    .then((bal) => {
		_address = web3.eth.accounts[0];
		_loaded = true;				
		_balance = web3.fromWei(bal, "ether").toString();
		_connected = web3.isConnected();
		try {
		    _networkId = web3 && web3.version && web3.version.network;
		} catch (err) {
		    console.log("error: ", err);
		    _networkId = -1;
		}
		_networkName = detectNetwork(_networkId);
	    }).then(() => {
		verifiedProxyContractApi.setup(web3);
		return _networkId !== -1;
	    });
    }

    // api
    return {
	isConnected: () => _connected,
	getBalance: () => _balance,
	getAddress: () => _address,
	isLoaded: () => _loaded,
	getNetworkId: () => _networkId,
	getNetworkName: () => _networkName,
	web3: web3,
	setup
    };
}


export default generateWeb3Api();
