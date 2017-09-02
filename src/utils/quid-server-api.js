import Promise from "bluebird"
import sha3 from 'solidity-sha3';

function stubPromise(returnData) {
    return new Promise(function(resolve, reject) {
	setTimeout(function() {
	    resolve(returnData);
	}, 1000);
    });
}

const api = {
    // Sender apis
    getSentTransfers:function(from) {
    	return fetch(`http://localhost:8000/api/v1/sender/transfers?from=${from}`)      			
    		.then(function(response) {
        	    return response.json();
      		}).then(function(body) {
        	    console.log({body});
        	    return body.transfers;
      		});
	
    },
    sendTransfer:function(phone, amount, ksData, pubKey, txHash, from) {
	const data =  {
	    from: from,
     	    publicKey: pubKey,
     	    phone: phone,
     	    amount: amount,
     	    txHash: txHash,
     	    verificationKeystoreData: ksData 
      	};
      	console.log("data:", data);
    	return fetch('http://localhost:8000/api/v1/sender/send', { 
            method: 'POST', 
            headers: {
        	'Accept': 'application/json',
      	   	'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)	
        }).then(function(response) {
            return response.json();
      	});
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
    }

}

export default api;
