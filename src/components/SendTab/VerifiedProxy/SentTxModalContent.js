import React, { Component } from 'react';

export default function SentTxResult({ code, error, errorMsg }) {

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
		<div style={{ marginTop: "60px" }}>
			<label>Verification code:</label>
			<h1 style={{ color: "#f6a821", fontWeight: "bold" }}> {code} </h1>
			<br />
		<label>Please save this verification code before closing the window. Pass it to a person you want to receive the ether.
		<br/>
		Don't worry - if you lose this code, you can cancel the transaction and repeat.</label>
		</div>
	);
}


