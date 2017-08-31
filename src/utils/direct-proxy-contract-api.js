import DirectProxy from './../../build/contracts/DirectProxy.json';


function stubPromise(returnData) {
    return new Promise(function(resolve, reject) {
	setTimeout(function() {
	    resolve(returnData);
	}, 5000);
    });
}


const api = {
    //for sender
    getTransfers:function(){
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

    sendTransfer:function(to, amount){
        return stubPromise(
            {
                success: true,
                result: "0x54668hvr6"
		  }
        );
    },
    cancelTransfer:function(txHash){
        return stubPromise(
            {
                success: true,
                result: "0x54668hvr6"
            }
        );
    },    

    //receiverApi
    getTransfersToReceive:function(){
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
        );
    },
    setWeb3:function(web3){
        Promise.promisifyAll(web3.eth, { suffix: "Promise" });
        api.web3 = web3
    },

    web3: undefined
}

export default api;
