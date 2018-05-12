import Promise from "bluebird";
import sha3 from 'solidity-sha3';
import urlGetter from './serverUrl';

export const registerTransfer = ({transferId, phoneHash,
				  transitAddress, transitKeystore,
				  senderAddress, amount
				 }) =>
    
    {
	const serverUrl = urlGetter.getServerUrl();	
	// data sent to server
	const data =  {
	    transferId,
	    phoneHash,
	    transitAddress,
	    transitKeystore,
	    senderAddress,
	    amount
	};
	
	return fetch(`${serverUrl}/api/v1/sender/register-transfer`, { 
            method: 'POST', 
            headers: {
		'Accept': 'application/json',
      		'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)	
	}).then((response)  => response.json());
    }


export const claimPhone = ({transferId, phone, dialCode, salt}) => {
	const serverUrl = urlGetter.getServerUrl();    
    	const data =  { 
     	    transferId,
	    phone,
	    salt,
	    dialCode
      	};
    	return fetch(`${serverUrl}/api/v1/receiver/claim-transfer`, { 
            method: 'POST', 
            headers: {
        	'Accept': 'application/json',
      	   	'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)	
        }).then((response)  => response.json());
}


export const verifyPhone = ({transferId, phone, dialCode, smsCode}) => {
    const serverUrl = urlGetter.getServerUrl();    
    const data =  {
     	transferId,
	phone,
	dialCode,
     	code: smsCode
    };
    return fetch(`${serverUrl}/api/v1/receiver/verify-sms`, { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
      	    'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)	
    }).then((response)  => response.json());
}


export const confirmTx = (transferId, receiverAddress, v, r, s) => {
    const serverUrl = urlGetter.getServerUrl();    
    const data =  { 
     	transferId,
     	receiverAddress,
     	v, 
     	r, 
     	s
    };
    
    return fetch(`${serverUrl}/api/v1/receiver/confirm-transfer`, { 
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
      	    'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)	
    }).then((response)  => response.json());
}
