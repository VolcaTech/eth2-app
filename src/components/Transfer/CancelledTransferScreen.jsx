import React, { Component } from 'react';
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


const CancelledTransferScreen = ({transfer}) => {
    const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});
    let title, subtitle;
    if (transfer.fetchedFromServer) { 
	title = "Transfer is canceled";
	subtitle = (
	    <div style={styles.subTitle}>
	      The sender has canceled the transfer.<br/>
	      You can ask him about it. If you need help<br/>
	      text us in <a href="https://t.me/eth2phone" style={styles.link}>Telegram</a>
	    </div>
	);
    } else {
	// from browser's localstorage
	title = "You canceled the transfer";
	subtitle = (
	    <div style={styles.subTitle}>
	      Having problems? Text us in <a href="https://t.me/eth2phone" style={styles.link}>Telegram</a><br/>
	      we are there to help
	    </div>
	);	
    }


    
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
	      <div style={styles.title}>{title}</div>	      
	    </div>
	    <div style={styles.subTitleContainer}>
	      { subtitle } 
	    </div>

	    <div style={styles.helpContainer}>
	      <div style={styles.helpText}>Transaction details on <a href={etherscanLink} style={styles.link}>Etherscan</a> 
	      </div>	      
	    </div>
	  </div>
	</div>
    );
}


export default CancelledTransferScreen;
