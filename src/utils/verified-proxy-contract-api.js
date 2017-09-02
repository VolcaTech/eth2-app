import Promise from "bluebird";
import VerifiedProxy from './../../build/contracts/VerifiedProxy.json';
const contract = require('truffle-contract');


function generateVerifiedProxyApi() {
    

    var web3, contractInstance, deployed;
    
    function setup(_web3) {
	web3 = _web3;
	const verifiedProxy = contract(VerifiedProxy);
        verifiedProxy.setProvider(web3.currentProvider);
        return verifiedProxy.deployed().then(function(instance) {
	    if (instance) {
		contractInstance = instance;
		deployed = true;
	    }
	    console.log(" verified contract proxy is set up!");
	    return true;	    
	});
    }
    
    function sendTransfer(pubkey, amount, phone, verificationCode){
	if (! deployed) {
	    alert("Verified Proxy Contract Is not deployed to selected network!");
	    return null;
	}	
        const weiAmount = web3.toWei(amount, "ether");
	return contractInstance.deposit(web3.toHex(pubkey), {from: web3.eth.accounts[0], value: weiAmount});
    }

    // api
    return {
	sendTransfer,
	setup
    };
    
}

export default generateVerifiedProxyApi();
