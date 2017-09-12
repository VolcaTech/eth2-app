import React, { Component } from 'react';
import TxInProgressModalContent from './TxInProgressModalContent';
import SentTxModalContent from './SentTxModalContent';

function EtherscanTxLink({hash, step}) {
    const etherscanUrl = "https://ropsten.etherscan.io/tx/";
    const txLink = etherscanUrl.concat(hash);
    if (!hash) { return null;}
    return (
	    <div style={step===1? { marginTop: "60px" }:{}}>
	     <label>
	      { step === 1 ?
		<span>Your TX has been broadcast to the network. It is waiting to be mined and confirmed. During ICOs it may take 3+ hours to confirm.<br /><br /></span> : ""}
	    <span style={ {fontSize:"0.9em"} }> You can also check your transaction on etherscan: </span>
	    <a style={{color: "#ccc", fontSize: "0.9em", textDecoration: "underline;"}} target="_blank" href={txLink}>{txLink}</a>
	    </label>
	    </div>
    );
}

export default function Modal(props) {
    const component = this;
    
    //console.log("HASH: ", props.hash)
    return (
	    <div className="modal fade in" id="myModal" tabIndex="-1" role="dialog" aria-hidden="true" style={{ display: (props.showModal ? "block" : "none"), 'paddingLeft': "0px" }}>
	    <div className="modal-dialog modal-lg">
	    <div className="modal-content">
	    <div className="modal-body">
	    <div>{!props.error ? <TxInProgressModalContent {...props} /> : "" }</div>
	    <div>{props.sendingTx ? "" : <SentTxModalContent {...props} />}</div>
	    <EtherscanTxLink hash={props.hash} step={props.step} />
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

