import React, { Component } from 'react';

function ReceiveLink({code, phone}) {
	const receiveUrl = "http://eth2phone.com/?tab=receiveTab&";
	//code=0I060J1G&phone=79112721136
    const receiveLink = receiveUrl.concat("code=").concat(code).concat("&phone=").concat(phone);
	//if (!phone) { return null;}
	console.log("LINK: ", receiveLink)
    return (
	    <div style={{marginTop: "10px", textAlign: "center"}}>
	     <label>
	    <a href={receiveLink}>{receiveLink}</a>
	    </label>
	    </div>
    );
}

export default function SentTxResult({ code, phone, error, errorMsg }) {

	if (error) {
		return (
			<div>
				<div style={{ color: 'red' }}>
					Error occured! {errorMsg.toString()}
				</div>
			</div>
		);
	}

	return (
		<div style={{ marginTop: "40px", textAlign: "center" }}>
			<label>The code below is required for a receiver to get the amount.</label>
			<h1 style={{ color: "#f6a821", fontWeight: "bold" }}> {code} </h1>
			<br />
		<label>You can either pass him the code to proceed manually or just drop the link below with that code already embedded.
			<br/>
			<ReceiveLink code={code} phone={phone}/>
		<br/>
		Don't worry - if you lose this code, you can cancel the transaction and repeat.</label>
		</div>
	);
}


