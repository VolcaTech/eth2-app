import React, { Component } from 'react';

export default function SentTxResult({code, error, errorMsg}) {

    if (error) {
	return (
	    <div className="modal-body">	    
		<div style={{color: 'red'}}>
		Error occured! {errorMsg.toString()}
	       </div>
            </div>
	);
    }
    
    return(
	    <div className="modal-body">
	        <h6> Success! </h6>
                  Verification code: 
                <h1 style={{color: "white", fontWeight: "bold"}}> {code} </h1>

	   </div>
          
        );
}
    
    
