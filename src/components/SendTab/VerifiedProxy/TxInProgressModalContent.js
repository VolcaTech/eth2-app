import React, { Component } from 'react';

export default function ModalContent({ step }) {
	console.log("STEP: ", step)
	let title, progBarStyle, dot1Style, dot2Style, dot3Style, textStyle1, textStyle2, textStyle3, pendingText;
	switch (step) {
		case 0:
			title = "Sending transaction...";
			progBarStyle = { width: "5%" };
			dot1Style = { fontsize: "24px", left: "6%", color: "#f6a821" };
			dot2Style = { fontsize: "24px", right: "50%" };
			dot3Style = { fontsize: "24px", right: "6%" };
			textStyle1 = { position: "absolute", left: "3%", color: "#f6a821" };
			textStyle2 = { position: "absolute", right: "44%" };
			textStyle3 = { position: "absolute", right: "2%" };
			break;
		case 1:
			title = "Transaction is pending...";
			progBarStyle = { width: "50%" };
			dot1Style = { fontsize: "24px", left: "6%", color: "#f6a821" };
			dot2Style = { fontsize: "24px", right: "50%", color: "#f6a821" };
			dot3Style = { fontsize: "24px", right: "6%" };
			textStyle1 = { position: "absolute", left: "3%", color: "#f6a821" };
			textStyle2 = { position: "absolute", right: "44%", color: "#f6a821" };
			textStyle3 = { position: "absolute", right: "2%" };
			break;
		case 2:
			title = "Transaction completed!";
			progBarStyle = { width: "100%" };
			dot1Style = { fontsize: "24px", left: "6%", color: "#f6a821" };
			dot2Style = { fontsize: "24px", right: "50%", color: "#f6a821" };
			dot3Style = { fontsize: "24px", right: "6%", color: "#f6a821" };
			textStyle1 = { position: "absolute", left: "3%", color: "#f6a821" };
			textStyle2 = { position: "absolute", right: "44%", color: "#f6a821" };
			textStyle3 = { position: "absolute", right: "2%", color: "#f6a821" };
			break;
	}
	return (
		<div>
			<h2 className="modal-title" >
				{title}</h2>
			<div className="m-t m-t-spinner"> <div className="loader-spin">  </div></div>
			<br />
			<br />
			<i className="fa fa-circle dot-progress" style={dot1Style}></i>
			<i className="fa fa-circle dot-progress" style={dot2Style}></i>
			<i className="fa fa-circle dot-progress" style={dot3Style}></i>
			<div className="progress m-t-xs full progress-small">
				<div style={progBarStyle} aria-valuemax="100" aria-valuemin="0" aria-valuenow="65" role="progressbar" className="progress-bar progress-bar-warning">
				</div>
			</div>
			<label style={textStyle1}>Created</label>
			<label style={textStyle2}>At processing</label>
			<label style={textStyle3}>Completed</label>
		</div>




	);
}

