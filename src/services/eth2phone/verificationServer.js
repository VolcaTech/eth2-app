import Promise from "bluebird";
import sha3 from 'solidity-sha3';
const SERVER_URL =  'http://ropsten.eth2phone.com';


export const registerTransfer = ({transferId, phone, phoneCode,
				  transitAddress, transitKeystore}) => {
    // data sent to server
    const data =  {
	transferId,
     	phone,
	phoneCode,
	transitAddress,
	transitKeystore
    };
    
    return fetch(`${SERVER_URL}/api/v1/sender/register-transfer`, { 
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


export const verifyPhone = (transferId, phone, smsCode) => {
    const data =  {
     	transferId,	
     	phone,
     	code: smsCode
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


export const confirmTx = (transferId, phone, to, v, r, s) => {
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
