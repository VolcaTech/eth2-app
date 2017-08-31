import Promise from "bluebird";
import VerifiedProxy from './../../build/contracts/VerifiedProxy.json';
const contract = require('truffle-contract');


const api = {
    sendTransfer: function(pubkey, amount, phone, verificationCode){
        const weiAmount = amount * 1000000000000000000;
        console.log("sending verified proxy", pubkey);
        const verifiedProxy = contract(VerifiedProxy);
        verifiedProxy.setProvider(api.web3.currentProvider);
        return verifiedProxy.deployed().then((instance) => {
            console.log("got instance: ", instance, api.web3.eth.accounts[0], pubkey);
	    console.log("from: ", api.web3.eth.accounts[0]);
            return instance.deposit(api.web3.toHex(pubkey), {from: api.web3.eth.accounts[0], value: weiAmount, nonce: Date.now()});
        }).then(function(result)  { 
            return (api.web3.eth.accounts[0]);
        });
    },    
    cancelTransfer:function(txHash){
        return stubPromise(
            {
                success: true,
                result: "0x54668hvr6"
            }
        );
    }
}

export default api;
