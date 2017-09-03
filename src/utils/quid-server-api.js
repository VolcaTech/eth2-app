import Promise from "bluebird";
import sha3 from 'solidity-sha3';

const SERVER_URL =  'http://localhost:8000';

const api = {
    sendTransferKeystore:function(transferId, phone,  ksData) {
	const data =  {
	    transferId: transferId,
     	    phone: phone,
     	    verificationKeystoreData: ksData 
      	};
      	console.log("data:", data);
    	return fetch(`${SERVER_URL}/api/v1/sender/send`, { 
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
    claimPhone: function(phone, verificationCode ) {
    	const transferId = sha3(phone + verificationCode);
	console.log({transferId});
    	const data =  { 
     		transferId: transferId
      	};
    	return fetch(`${SERVER_URL}/api/v1/receiver/claim-transfer`, { 
        	method: 'POST', 
        	headers: {
        	  'Accept': 'application/json',
      	   	  'Content-Type': 'application/json'
        	},
        body: JSON.stringify(data)	
        	})
      		.then(function(response) {
      		    console.log({response});
        	    return response.json();
      		});
    },
    verifyPhone: function(phone, verificationCode,  smsCode) {
    	const transferId = sha3(phone + verificationCode);
    	const data =  { 
     		phone: phone,
     		transferId: transferId,
     		code: smsCode
      	};
    	return fetch(`${SERVER_URL}/api/v1/receiver/verify-sms`, { 
        	method: 'POST', 
        	headers: {
        	  'Accept': 'application/json',
      	   	  'Content-Type': 'application/json'
        	},
        body: JSON.stringify(data)	
        	})
      		.then(function(response) {
      		    console.log(response);
        	    return response.json();
      		});
    },
    confirmTx: function(phone, verificationCode,  smsCode, to, v, r, s) {
    	const transferId = sha3(phone + verificationCode);
    	const data =  { 
     	    phone: phone,
     	    transferId: transferId,
     	    code: smsCode, 
     	    to: to,
     	    v: v, 
     	    r: r, 
     	    s: s
      	};
    	return fetch(`${SERVER_URL}/api/v1/receiver/confirm-transfer`, { 
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
      		});
    }

}

export default api;
