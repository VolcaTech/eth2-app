import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { parse, format, asYouType } from 'libphonenumber-js';
import { ShareButton } from './components';


const styles = {    
    titleContainer: {
	marginTop: 30,
	marginBottom: 12
    },
    subTitleContainer: {
	width: 320,
	margin: 'auto',
    },
    helpContainer: {
	marginTop: 27
    },
    stepsBar: {
	marginTop: 20
    },
    instructionsText: {
	lineHeight: '25px',
	color: '#000000',
	fontFamily: 'SF Display Bold',
	fontSize: 16,
	fontWeight: 700,
	marginBottom: 20,
	marginTop: 46
    }    
}


const DepositedScreen = ({transfer}) => {

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
		You've sent <span className="text-blue">{transfer.amount}</span>
		<span className="text-gray"> ETH</span><br/>
		to {formattedPhone}
	      </div>	      
	    </div>

	    <div style={styles.subTitleContainer}>
	      <div className="text">
		Copy the link with the code below<br/>
		and share it with the receiver. You can cancel the<br/>
		transfer later in "Transfers"
	      </div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	    <div style={styles.instructionsText}>Copy link and share with receiver</div>
	    <div style={styles.buttonContainer}>
	      <ShareButton transfer={transfer}/>
	    </div>
	    
	  </div>
	</div>
    );
}


export default DepositedScreen;
