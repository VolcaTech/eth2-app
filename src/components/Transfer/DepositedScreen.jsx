import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { parse, format, asYouType } from 'libphonenumber-js';
import { ShareButton } from './components';


const styles = {    
    link: {
	color: '#0099ff',
	fontFamily: 'SF Display Bold',
    },
    titleContainer: {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	marginTop: 30,
	marginBottom: 12
    },
    title: {
	display: 'block',
	margin: 'auto',
	fontSize: 20,
	fontFamily: 'SF Display Black',
	textAlign: 'center',
	lineHeight: '28px'
    },
    subTitleContainer: {
	width: 320,
	margin: 'auto',
    },
    subTitle: {
	fontSize: 14,	
	lineHeight: 1.25
    },    
    button: {
	width: '70%',
	margin: 'auto',
	paddingTop: 5,
	paddingBottom: 5,
	borderRadius: 12,
	border: '2px solid #0099ff',
	backgroundColor: '#ffffff',
    },
    buttonText: {
	color: '#0099ff',
	fontFamily: 'SF Display Black',
	fontSize: 18,
    },
    helpContainer: {
	marginTop: 27
    },
    helpText: {
	fontSize: 14,		
	lineHeight: 1.25
    },
    stepsBar: {
	marginTop: 20
    },
    center: {
	textAlign: 'center'
    },
    blue: {
	color: '#0099ff'
    },
    gray: {
	color: "#999999"
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
	  <div style={styles.center}>
	    <div style={styles.titleContainer}>
	      <div style={styles.title}>
		You've sent <span style={styles.blue}>{transfer.amount}</span>
		<span style={styles.gray}> ETH</span><br/>
		to {formattedPhone}
	      </div>	      
	    </div>

	    <div style={styles.subTitleContainer}>
	      <div style={styles.subTitle}>You can copy the link with the code below<br/>
		and share it with the receiver. You can cancel the<br/>
		transfer later in "Transfers"
	      </div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div style={styles.helpText}>Transaction details on <a href={etherscanLink} style={styles.link}>Etherscan</a> 
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
