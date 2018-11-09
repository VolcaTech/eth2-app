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
	marginTop: 15	
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
    },
    greenBold: {
	color: '#2bc64f',
	fontFamily: 'SF Display Bold'	
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
		<span className="text-gray">You deposited </span><span className="text-blue">{transfer.amount}</span>
		<span className="text-gray"> ETH</span><br/>
		Receiver will need the link<br/>
		below to claim:
	      </div>	      
	    </div>

	    <div style={styles.buttonContainer}>
	      <ShareButton transfer={transfer}/>
	    </div>
	    
	    <div style={styles.subTitleContainer}>
	      <div className="text">
		We will not send the link to receiver<br/>
		for security reasons. <span style={styles.greenBold}> You need to copy<br/>
		and send the link directly to the receiver</span>
	      </div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	    
	  </div>
	</div>
    );
}


export default DepositedScreen;
