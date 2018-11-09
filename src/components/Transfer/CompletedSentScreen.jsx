import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { parse, format, asYouType } from 'libphonenumber-js';
import ButtonPrimary from './../../components/common/ButtonPrimary';

const styles = {
    titleContainer: {
	marginTop: 65,
	marginBottom: 12
    },
    buttonContainer: {
	width: '70%',
	margin: 'auto',
	marginTop: 70,	
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
		Receiver claimed <span className="text-blue">{transfer.amount}</span>
		<span className="text-gray"> ETH</span><br/>
		with {transfer.verificationType === 'none' ?  'special link' : formattedPhone }
	      </div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	    <div style={styles.buttonContainer}>	      
	      <Link to="/" className="send-button no-underline">
		<ButtonPrimary buttonColor="#0099ff" className="landing-send">Send more Ether</ButtonPrimary>
	      </Link>
	    </div>
	    
	  </div>
	</div>
    );
}


export default CompletedSentScreen;
