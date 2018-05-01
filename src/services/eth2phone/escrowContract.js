import Promise from "bluebird";
import e2pEscrow from '../../../build/contracts/e2pEscrow.json';
const contract = require('truffle-contract');
import web3Service from "../web3Service";


const EscrowContractService = () => {
    var web3, contractInstance, deployed, contractWeb3;    
    const FIXED_COMMISSION = 0.01;

    function _parseTransfer(result) {
	return {
	    transitAddress: result[0].toString(),
	    from: result[2].toString('hex'),
	    amount: web3.fromWei(result[3], "ether").toString()
	};
    }
    
    function setup(_web3) {
	web3 = _web3;
	const escrowConstract = contract(e2pEscrow);
        escrowConstract.setProvider(web3.currentProvider);
        return escrowConstract.deployed().then((instance) => {
	    if (instance) {
		contractInstance = instance;
		contractWeb3 = web3.eth.contract(contractInstance.abi).at(contractInstance.address);
		Promise.promisifyAll(contractWeb3, { suffix: "Promise" });
		deployed = true;
	    }
	    console.log(" eth2phone escrow contract is set up!");
	    return true;	    
	});
    }

    function getAmountWithCommission(amount) {
	const commission = web3.toWei(FIXED_COMMISSION, 'ether');
	const amountWithCommissionWei = web3Service.toBigNumber(web3Service.toWei(amount, "ether")).plus(commission);
	const amountWithCommission = web3Service.fromWei(amountWithCommissionWei, 'ether');
	console.log({commission, amountWithCommissionWei, amountWithCommission});
	return {commission, amountWithCommission};
    }
    
    function deposit(pubkey, amount){	
	if (!deployed) {
	    alert("Verified Proxy Contract Is not deployed to selected network!");
	    return null;
	}	
        const weiAmount = web3.toWei(amount, "ether");
	return contractWeb3.depositPromise(web3.toHex(pubkey), {from: web3.eth.accounts[0], value: weiAmount, gasPrice: web3.toWei(23, "gwei")});
    }
    
    function cancel(transferId){	
	if (!deployed) {
	    alert("Verified Proxy Contract Is not deployed to selected network!");
	    return null;
	}	
	return contractInstance.cancelTransfer( transferId, {from: web3.eth.accounts[0]});
    }

    
    function getSentTransfers(){	
	//	if (!contractInstance) {
	return Promise.resolve([]);
	//}	
	// return contractInstance.getSentTransfersCount.call(null, {from: web3.eth.accounts[0]})
	//     .then((result) => {
	// 	return result.toNumber();
	//     }).then((count) => {
	// 	const getTransferPromises = [];
	// 	for (let i=count-1; i >= 0; i--) {
	// 	    getTransferPromises.push(new Promise(function(resolve, reject) {
	// 		contractInstance.getSentTransfer(i, {from: web3.eth.accounts[0]})
	// 		    .then((res) => {
	// 			return res;
	// 		    }).then(_parseTransfer)
	// 		    .then((res) => resolve(res))
	// 		    .catch((err) => reject(err));				
	// 	    }));
	// 	}
		
	// 	return Promise.all(getTransferPromises);
	//     }).then((transfers) => {
	// 	return transfers;
	//     });
    };

    

    // api
    return {
	deposit,
	setup,
	getSentTransfers,
	getAmountWithCommission,
	cancel,
	getContractAddress: () => contractInstance.address
    };
    
}

export default EscrowContractService();
