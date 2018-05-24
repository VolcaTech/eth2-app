import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { parse, format, asYouType } from 'libphonenumber-js';

const styles = {
    titleContainer: {
	marginTop: 65,
	marginBottom: 12
    },
    buttonContainer: {
	marginTop: 70
    },    
    helpContainer: {
	marginTop: 27
    },
    stepsBar: {
	marginTop: 40
    },
}


const CompletedSentScreen = ({transfer}) => {

    const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});    
    const formattedPhone = format(transfer.receiverPhone, 'International');
    
    
    return (
	<div>
	  <div style={styles.stepsBar}>
            <TransferStepsBar
	       status={transfer.status}
	       direction={transfer.direction}
	       isError={transfer.isError}/>
	  </div>
	  <div className="text-center">
	    <div style={styles.titleContainer}>
	      <div className="title">
		Receiver got <span className="text-blue">{transfer.amount}</span>
		<span className="text-gray"> ETH</span><br/>
		by {formattedPhone}
	      </div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	    <div style={styles.buttonContainer}>
	      <Link to="/"  className="btn-inverted no-underline">
		<div>
		  <span>Send more Ether</span>
		</div>
	      </Link>
	    </div>
	    
	  </div>
	</div>
    );
}


export default CompletedSentScreen;
