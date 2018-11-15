import Promise from "bluebird";
import e2pEscrow from '../../../build/contracts/e2pEscrow.json';
const contract = require('truffle-contract');
import web3Service from "../web3Service";
const CONTRACT_ADDRESS_V1 =  '0xef0469e78c6537a7239470b752653345c873a3fb'; // old contract

const EscrowContractService = () => {
    var web3, contractInstance, deployed, contractWeb3;    
    const FIXED_COMMISSION = 0;

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
	return {commission, amountWithCommission};
    }
    
    function deposit(pubkey, amount){	
	if (!deployed) {
	    alert("E2P Escrow Contract is not deployed to selected network!");
	    return null;
	}	
        const weiAmount = web3.toWei(amount, "ether");
	return contractWeb3.depositPromise(web3.toHex(pubkey), {from: web3.eth.accounts[0], value: weiAmount,  gas: 110000});
    }
    
    function cancel(transitAddress, contractVersion = 2){	
	if (!deployed) {
	    alert("E2P Escrow Contract is not deployed to selected network!");
	    return null;
	}		
	
	if (contractVersion === 1) {
	    // legacy contract
	    const oldContract = web3.eth.contract(contractInstance.abi).at(CONTRACT_ADDRESS_V1);
		Promise.promisifyAll(oldContract, { suffix: "Promise" });	    
	    return oldContract.cancelTransferPromise(transitAddress, {from: web3.eth.accounts[0]});
	} else {
	    return contractWeb3.cancelTransferPromise(transitAddress, {from: web3.eth.accounts[0], gas: 100000});
	}
    }

    
    function getWithdrawalEvents(address, fromBlock){
	return new Promise((resolve, reject) => {
	    const eventsGetter = contractWeb3.LogWithdraw({'sender': address}, { fromBlock, toBlock: 'latest', address: contractInstance.address });
	    eventsGetter.get((error, response) => {
		if (error) { return reject(error); }
		resolve(response);
	    });
	});
    };
    

    // api
    return {
	deposit,
	setup,
	getWithdrawalEvents,
	getAmountWithCommission,
	cancel,
	getContractAddress: () => contractInstance && contractInstance.address
    };
    
}

export default EscrowContractService();
