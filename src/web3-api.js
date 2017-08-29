import Promise from "bluebird"
import VerifiedProxy from './../build/contracts/VerifiedProxy.json'


function stubPromise(returnData) {
    return new Promise(function(resolve, reject) {
	setTimeout(function() {
	    resolve(returnData);
	}, 5000);
    });
}


const api = {
    //for sender
    getDirectProxyTransfers:function(){
        return stubPromise(
            {
                success: true,
                result: [
                    {
                        
                        txHash: "0x3423421",
                        receiver: "0x213123",
                        amount: 15.6,
                        status: "pending",
                        date: Date.now
                    },
                    {
                        txHash: "0x3423421",
                        receiver: "0x213123",
                        amount: 15.6,
                        status: "received",
                        date: Date.now
                    },
                    {
                        txHash: "0x3423421",
                        receiver: "0x213123",
                        amount: 15.6,
                        status: "cancelled",
                        date: Date.now
                    }
                ]
            }
        )
    },

    sendDirectProxyTransfer:function(to, amount){
        return stubPromise(
            {
                success: true,
                result: "0x54668hvr6"
            }
        )
    },

    sendVerificationProxyTransfer:function(pubkey, amount, phone, verificationCode){
        const weiAmount = amount * 1000000000000000000;
        console.log("sending verified proxy", pubkey)
        const contract = require('truffle-contract')
        const verifiedProxy = contract(VerifiedProxy)
        verifiedProxy.setProvider(api.web3.currentProvider)
        return verifiedProxy.deployed().then((instance) => {
            console.log("got instance: ", instance, api.web3.eth.accounts[0], pubkey)
            return instance.deposit(api.web3.toHex(pubkey), {from: api.web3.eth.accounts[0], value: weiAmount, nonce: Date.now()})
        }).then(function(result)  { 
            return (api.web3.eth.accounts[0])
        })
    },

    cancelSimpleProxyTransfer:function(txHash){
        return stubPromise(
            {
                success: true,
                result: "0x54668hvr6"
            }
        )
    },

    cancelVerificationProxyTransfer:function(txHash){
        return stubPromise(
            {
                success: true,
                result: "0x54668hvr6"
            }
        )
    },

    //receiverApi
    getPendingDirectProxyTransfers:function(){
        return stubPromise(
            {
                success: true,
                result: [
                    {
                        
                        txHash: "0x3423421",
                        receiver: "0x213123",
                        amount: 15.6,
                        status: "pending",
                        date: Date.now
                    },
                    {
                        txHash: "0x3423421",
                        receiver: "0x213123",
                        amount: 15.6,
                        status: "received",
                        date: Date.now
                    },
                    {
                        txHash: "0x3423421",
                        receiver: "0x213123",
                        amount: 15.6,
                        status: "cancelled",
                        date: Date.now
                    }
                ]
            }
        )
    },

    getBalance:function(){
        return stubPromise(
            "15.6"
        )
    },

    isConnected:function(){
        if (api.web3 === undefined) {
            console.log("web3 is undefined")
            return false
        }
        console.log(api.web3)
        return api.web3.isConnected()
    },

    getBalance:function(){
        if (api.web3 === undefined) {
            console.log("web3 is undefined")
            return 0
        }
        const address = api.getAddress()
        return api.web3.eth.getBalancePromise(address)
        .then(function(bal) { return api.web3.fromWei(bal, "ether").toString() })
    },

    getAddress:function(){
        if (api.web3 === undefined) {
            console.log("web3 is undefined")
            return "no address"
        }
        return api.web3.eth.accounts[0]
    },

    setWeb3:function(web3){
        Promise.promisifyAll(web3.eth, { suffix: "Promise" });
        api.web3 = web3
    },

    web3: undefined
}

export default api;
