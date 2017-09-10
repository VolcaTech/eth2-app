import Promise from "bluebird";
import VerifiedProxy from './../../build/contracts/VerifiedProxy.json';
const contract = require('truffle-contract');


function generateVerifiedProxyApi() {
    

    var web3, contractInstance, deployed;

    function _parseTransfer(result) {
	return {
	    id: result[0].toString(),
	    status: result[1].toNumber(),
	    from: result[2].toString('hex'),
	    amount: web3.fromWei(result[3], "ether").toString()
	};
    }

    function watchEvents() {
	console.log("watching events: ", web3.eth.accounts);
	const depositEvent = contractInstance.LogDeposit( {from: web3.eth.accounts[0]}, {fromBlock: 1505829, toBlock: 'latest', address: contractInstance.address });
	depositEvent.watch(function(error, response) {
	    console.log({error});
	    console.log({response});
	});
    }
    
    function setup(_web3) {
	web3 = _web3;
	const verifiedProxy = contract(VerifiedProxy);
        verifiedProxy.setProvider(web3.currentProvider);
        return verifiedProxy.deployed().then(function(instance) {
	    if (instance) {
		contractInstance = instance;
		deployed = true;
	    }
	    watchEvents();
	    console.log(" verified contract proxy is set up!");
	    return true;	    
	});
    }
    
    function deposit(pubkey, amount, transferId){	
	if (!deployed) {
	    alert("Verified Proxy Contract Is not deployed to selected network!");
	    return null;
	}	
        const weiAmount = web3.toWei(amount, "ether");
	return contractInstance.deposit(web3.toHex(pubkey), transferId, {from: web3.eth.accounts[0], value: weiAmount});
    }

    function cancel(transferId){	
	if (!deployed) {
	    alert("Verified Proxy Contract Is not deployed to selected network!");
	    return null;
	}	
	return contractInstance.cancelTransfer( transferId, {from: web3.eth.accounts[0]});
    }

    
    function getSentTransfers(){	
	if (!contractInstance) {
	    return Promise.resolve([]);
	}
	
	
	return contractInstance.getSentTransfersCount.call(null, {from: web3.eth.accounts[0]})
	    .then((result) => {
		console.log('getSentTransfersCount', result.toNumber());
		return result.toNumber();
	    }).then((count) => {
		const getTransferPromises = [];
		for (let i=count-1; i >= 0; i--) {
		    getTransferPromises.push(new Promise(function(resolve, reject) {
			console.log("getting transfer: ", i);
			contractInstance.getSentTransfer(i, {from: web3.eth.accounts[0]})
			    .then((res) => {
				console.log({res});
				return res;
			    }).then(_parseTransfer)
			    .then((res) => resolve(res))
			    .catch((err) => reject(err));				
		    }));
		}
		
		return Promise.all(getTransferPromises);
	    }).then((transfers) => {
		console.log({transfers});
		return transfers;
	    });
    };

    

    // api
    return {
	deposit,
	setup,
	getSentTransfers,
	cancel
    };
    
}

export default generateVerifiedProxyApi();
