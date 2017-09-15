import React, { Component } from 'react';


function EtherscanTxLink({hash, step}) {
    const etherscanUrl = "https://ropsten.etherscan.io/tx/";
    const txLink = etherscanUrl.concat(hash);
    if (!hash) { return null;}
    return (
	<div style={{marginTop: "200px", textAlign: "center"}}>
	  <label>
	    { step === 2 ?
	    <span>Your TX has been broadcast to the network. It is waiting to be mined and confirmed. During ICOs it may take 3+ hours to confirm.<br /><br /></span> : ""}
	    <span style={ {fontSize:"0.9em"} }> Verify transaction on etherscan: </span>
	    <br/>
	    <a style={{color: "#ccc", fontSize: "0.9em"}} target="_blank" href={txLink}>{txLink}</a>
	  </label>
	</div>
    );
}


export default function ReceiveTxProgress({step, txId, address, txAmount}) {
    let title, progBarStyle, dot1Style, dot2Style, dot3Style, textStyle1, textStyle2, textStyle3, pendingText;
    switch (step) {
    case 1:
	title = "Sending transaction...";
	progBarStyle = { width: "5%" };
	dot1Style = { fontsize: "24px", color: "#f6a821" };
	dot2Style = { fontsize: "24px", right: "50%" };
	dot3Style = { fontsize: "24px", right: "1%" };
	textStyle1 = { position: "absolute", left: "0%", color: "#f6a821" };
	textStyle2 = { position: "absolute", right: "47%" };
	textStyle3 = { position: "absolute", right: "-1%" };
	break;
    case 2:
	title = "Transaction is pending...";
	progBarStyle = { width: "50%" };
	dot1Style = { fontsize: "24px", color: "#f6a821" };
	dot2Style = { fontsize: "24px", right: "50%", color: "#f6a821" };
	dot3Style = { fontsize: "24px", right: "1%" };
	textStyle1 = { position: "absolute", left: "0%", color: "#f6a821" };
	textStyle2 = { position: "absolute", right: "47%", color: "#f6a821" };
	textStyle3 = { position: "absolute", right: "2%" };
	break;
    case 3:
	title = "Transaction completed!";
	progBarStyle = { width: "100%" };
	dot1Style = { fontsize: "24px", color: "#f6a821" };
	dot2Style = { fontsize: "24px", right: "50%", color: "#f6a821" };
	dot3Style = { fontsize: "24px", right: "1%", color: "#f6a821" };
	textStyle1 = { position: "absolute", left: "0%", color: "#f6a821" };
	textStyle2 = { position: "absolute", right: "47%", color: "#f6a821" };
	textStyle3 = { position: "absolute", right: "-1%", color: "#f6a821" };
	break;
    }
    const addressLink = `https://ropsten.etherscan.io/address/${address}`;
    return (
	    <div>
	    <h3 className="modal-title">
	    {title}</h3>
	    <div className="m-t m-t-spinner" style={{marginTop: "15px"}}>
	      {step !== 3 ? <div className="loader-spin" style={{marginTop:"10px"}}> </div> : <div className="final-tick" >&#10003;</div>} 
	    </div>
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
		<div className="row" style={{marginTop:"65px"}}>
		  <div className="col-md-12 text-center" style={{marginTop:"50px"}}>
		    
		    <h1 style={{fontSize: "40px"}}> <span className="gold"> +{txAmount} eth </span></h1>
		    <h5> <a href={addressLink} target="_blank" style={{color: "#ccc"}}> to {address} </a>  </h5>
		  </div>
		  <EtherscanTxLink hash={txId} step={step}/>
		</div>
	    </div>
	);
}
//<h4> Current balance is <span> 3.03 eth </span></h4>
