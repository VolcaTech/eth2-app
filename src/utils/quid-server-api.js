import Promise from "bluebird"
import sha3 from 'solidity-sha3';

function stubPromise(returnData) {
    return new Promise(function(resolve, reject) {
	setTimeout(function() {
	    resolve(returnData);
	}, 1000);
    });
}

function checkWeb3 (w3) {
	return new Promise(function(resolve, reject) {
		console.log("checkWeb3", w3)
		if (!w3) {
			setTimeout(function() {
				resolve()
			}, 2000);
		} else {
			console.log("resolving...")
			resolve()
		}
	})

}

const api = {

    // Sender apis
    getSentTransfers:function() {
		  var self = this;
		  	console.log("HERERRRR")
		  	return checkWeb3(api.web3).then(function() {
		  		console.log("resolved")

		  	const _from = api.web3.eth.accounts[0]
		 	 console.log("HERERRRR", _from)
    		return fetch(`http://localhost:8000/api/v1/sender/transfers?from=${_from}`)
      				
		 })
		.then(function(response) {
      			console.log("IN RESPONSEEE")
        		return response.json()
      		}).then(function(body) {
        		console.log({body});
        		return body.transfers
      		})

    },
    sendToPhone:function(phone, amount, ksData, pubKey, txHash, _from ) {
	//return stubPromise({success: true});
	//return stubPromise({success: false, msg: "Error"});
	console.log(ksData)
	return new Promise(function(resolve, reject) {
		  var self = this;
		  const data =  { from: _from,
     		publicKey: pubKey,
     		phone: phone,
     		amount: amount,
     		txHash: txHash,
     		verificationKeystoreData: ksData 
      		}
      		console.log("data:", data)
    	return fetch('http://localhost:8000/api/v1/sender/send', { 
        	method: 'POST', 
        	headers: {
        	  'Accept': 'application/json',
      	   	  'Content-Type': 'application/json'
        	},
        body: JSON.stringify(data)	
        	})
      		.then(function(response) {
        		return response.json()
      		}).then(function(body) {
        		console.log(body);
        		resolve()
      		}).catch(reject);

		})	

    },

    // receiver apis
    getTransfer:function(phone, verificationCode) {
	return stubPromise({
	    success: true,
	    result: {
		ksData: "",
		txHash: "0xdsfdfs",
		sum: 15.6,
		date: Date.now
	    }});
    },
    claimPhone: function(phone, verificationCode ) {
    	const txHash = sha3(phone, verificationCode);
    	const data =  { 
     		phone: phone,
     		txHash: txHash,
      		}
    	return fetch('http://localhost:8000/api/v1/receiver/claim-transfer', { 
        	method: 'POST', 
        	headers: {
        	  'Accept': 'application/json',
      	   	  'Content-Type': 'application/json'
        	},
        body: JSON.stringify(data)	
        	})
      		.then(function(response) {
      			console.log(response)
        		return response.json()
      		})
    },
    verifyPhone: function(phone, verificationCode,  smsCode) {
    	const txHash = sha3(phone, verificationCode);
    	const data =  { 
     		phone: phone,
     		txHash: txHash,
     		code: smsCode
      		}
    	return fetch('http://localhost:8000/api/v1/receiver/verify-sms', { 
        	method: 'POST', 
        	headers: {
        	  'Accept': 'application/json',
      	   	  'Content-Type': 'application/json'
        	},
        body: JSON.stringify(data)	
        	})
      		.then(function(response) {
      			console.log(response)
        		return response.json()
      		})
    },
    confirmTx: function(phone, verificationCode,  smsCode, to, v, r, s) {
    	const txHash = sha3(phone, verificationCode);
    	const data =  { 
     		phone: phone,
     		txHash: txHash,
     		code: smsCode, 
     		to: to,
     		v: v, 
     		r: r, 
     		s: s
      		}
    	return fetch('http://localhost:8000/api/v1/receiver/confirm-transfer', { 
        	method: 'POST', 
        	headers: {
        	  'Accept': 'application/json',
      	   	  'Content-Type': 'application/json'
        	},
        body: JSON.stringify(data)	
        	})
      		.then(function(response) {
      			console.log(response)
        		return response.json()
      		})
    },
       setWeb3:function(web3){
        Promise.promisifyAll(web3.eth, { suffix: "Promise" });
        api.web3 = web3
    },
        web3: undefined	
}

export default api;
