import Promise from "bluebird";
import sha3 from 'solidity-sha3';
const SERVER_URL =  'https://eth2phone.com';




export const sendTransferKeystore = (transferId, phone, phoneCode,  ksData) => {
    // data sent to server
    const data =  {
	transferId,
     	phone,
	phoneCode,
     	verificationKeystoreData: ksData 
    };
    
    return fetch(`${SERVER_URL}/api/v1/sender/send`, { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
      	    'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)	
    }).then((response)  => response.json());
}


export const claimPhone = (transferId, phone) => {
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
        }).then((response)  => response.json());
}


export const verifyPhone = (transferId, phone, code) => {
    const data =  {
     	transferId,	
     	phone,
     	code
    };
    return fetch(`${SERVER_URL}/api/v1/receiver/verify-sms`, { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
      	    'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)	
    }).then((response)  => response.json());
}


export const confirmTx = (transferId, phone, code, to, v, r, s) => {
    const data =  { 
     	phone,
     	transferId,
     	to,
     	v, 
     	r, 
     	s
    };
    
    return fetch(`${SERVER_URL}/api/v1/receiver/confirm-transfer`, { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
      	    'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)	
    }).then((response)  => response.json());
}
