import React, { Component } from 'react';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';


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
    subTitleContainer: {
	width: 300,
	margin: 'auto',
    },
    subTitle: {
	fontSize: 14,	
	lineHeight: 1.25
    },
    helpContainer: {
	marginTop: 31.5	
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
    }
}


const TxErrorScreen = ({transfer}) => {
    const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});
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
	      <div style={styles.title}>Transaction failed</div>	      
	    </div>
	    <div style={styles.subTitleContainer}>
	      <div style={styles.subTitle}>Something went wrong. Check details on<br/>
		<a href={etherscanLink} style={styles.link}>Etherscan</a> and if transaction is out of gas<br/>
	      send Ether again with higher gas price</div>	      
	    </div>

	    <div style={styles.helpContainer}>
	      <div style={styles.helpText}>Also check or text us<br/>
		in <a href="https://t.me/eth2phone" style={styles.link}>Telegram</a> so we can help</div>	      
	    </div>
	  </div>
	</div>
    );
}


export default TxErrorScreen;
