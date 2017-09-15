import Promise from "bluebird";
import sha3 from 'solidity-sha3';
const SERVER_URL =  'https://eth2phone.com';

const api = {
    sendTransferKeystore:function(transferId, phone, phoneCode,  ksData) {
	const data =  {
	    transferId: transferId,
     	    phone: phone,
	    phoneCode: phoneCode,
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
    claimPhone: function(transferId, phone) {
	console.log({transferId});
    	const data =  { 
     	    transferId: transferId,
	    phone: phone
      	};
    	return fetch(`${SERVER_URL}/api/v1/receiver/claim-transfer`, { 
            method: 'POST', 
            headers: {
        	'Accept': 'application/json',
      	   	'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)	
        }).then(function(response) {
      	    console.log({response});
            return response.json();
      	});
    },
    verifyPhone: function(transferId, phone, smsCode) {
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
        }).then(function(response) {
      	    console.log(response);
            return response.json();
      	});
    },
    confirmTx: function(transferId, phone,  smsCode, to, v, r, s) {
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
        }).then(function(response) {
      	    console.log(response);
            return response.json();
      	});
    }

}

export default api;
