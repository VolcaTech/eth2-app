import Promise from "bluebird";
import sha3 from 'solidity-sha3';
const SERVER_URL =  'http://ropsten.eth2phone.com';


export const registerTransfer = ({transferId, phoneHash,
				  transitAddress, transitKeystore}) => {
    // data sent to server
    const data =  {
	transferId,
	phoneHash,
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


export const claimPhone = ({transferId, phone, dialCode, salt}) => {
    	const data =  { 
     	    transferId,
	    phone,
	    salt,
	    dialCode
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


export const verifyPhone = ({transferId, phone, dialCode, smsCode}) => {
    const data =  {
     	transferId,
	phone,
	dialCode,
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


export const confirmTx = (transferId, receiverAddress, v, r, s) => {
    const data =  { 
     	transferId,
     	receiverAddress,
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
