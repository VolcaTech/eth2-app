import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { parse, format, asYouType } from 'libphonenumber-js';

const styles = {
    link: {
	color: '#0099ff',
	fontFamily: 'SF Display Bold',
    },
    titleContainer: {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	marginTop: 65,
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
    buttonContainer: {
	marginTop: 70
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
	marginTop: 60
    },
    center: {
	textAlign: 'center'
    },
    blue: {
	color: '#0099ff'
    },
    gray: {
	color: "#999999"
    }
    
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
	  <div style={styles.center}>
	    <div style={styles.titleContainer}>
	      <div style={styles.title}>
		Receiver got <span style={styles.blue}>{transfer.amount}</span>
		<span style={styles.gray}> ETH</span><br/>
		by {formattedPhone}
	      </div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div style={styles.helpText}>Transaction details on <a href={etherscanLink} style={styles.link}>Etherscan</a> 
	      </div>	      
	    </div>
	    <div style={styles.buttonContainer}>
	      <Link to="/"  className="no-underline">
		<div style={styles.button}>
		  <span style={styles.buttonText}>Send more Ether</span>
		</div>
	      </Link>
	    </div>
	    
	  </div>
	</div>
    );
}


export default CompletedSentScreen;
