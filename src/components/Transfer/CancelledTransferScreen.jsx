import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';


const styles = {
    titleContainer: {
	marginTop: 65,
	marginBottom: 12
    },
    subTitleContainer: {
	width: 300,
	margin: 'auto',
    },
    helpContainer: {
	marginTop: 31.5	
    },
    stepsBar: {
	marginTop: 60
    }
}


const CancelledTransferScreen = ({transfer}) => {
    const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});
    let title, subtitle;
    if (transfer.fetchedFromServer) { 
	title = "Transfer is canceled";
	subtitle = (
	    <div className="text">
	      The sender has canceled the transfer.<br/>
	      You can ask him about it. If you need help<br/>
	      text us in <a href="https://t.me/eth2io" className="link">Telegram</a>
	    </div>
	);
    } else {
	// from browser's localstorage
	title = "You canceled the transfer";
	subtitle = (
	    <div className="text">
	      Having problems? Text us in <a href="https://t.me/eth2io" className="link">Telegram</a><br/>
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
	  <div className="text-center">
	    <div style={styles.titleContainer}>
	      <div className="title">{title}</div>	      
	    </div>
	    <div style={styles.subTitleContainer}>
	      { subtitle } 
	    </div>

	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	  </div>
	</div>
    );
}


export default CancelledTransferScreen;
