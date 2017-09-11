import React, { Component } from 'react';
import TxInProgressModalContent from './TxInProgressModalContent';
import SentTxModalContent from './SentTxModalContent';

function ShowTextInProgress(hash) {
	const link = "https://ropsten.etherscan.io/tx/";
	const ropstenLink = link.concat(hash);
	console.log("LINK: ", ropstenLink);
	return (
		<div style={{ marginTop: "60px" }}>
			<label>Your TX has been broadcast to the network. It is waiting to be mined and confirmed. During ICOs it may take 3+ hours to confirm.<br /><br />You can also check your transaction on etherscan:<br />
				<a href={ropstenLink}>{ropstenLink}</a>
			</label>
		</div>
	)
}

export default function Modal(props) {
	const component = this;

	console.log("HASH: ", props.hash)
	return (
		<div className="modal fade in" id="myModal" tabIndex="-1" role="dialog" aria-hidden="true" style={{ display: (props.showModal ? "block" : "none"), 'paddingLeft': "0px" }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<div><TxInProgressModalContent {...props} /></div>
						<div>{props.step === 1 ? ShowTextInProgress(props.hash) : ""}</div>
						<div>{props.sendingTx ? "" : <SentTxModalContent {...props} />}</div>
					</div>
					<div className="modal-footer">
						{!props.sendingTx ?
							<button type="button" className="btn btn-default" onClick={() => props.closeModal()} >Close</button>
							: <div className="small-margin"> Please don't close this window before the transaction is completed.</div>}
					</div>
				</div>
			</div>
		</div>
	);
}

