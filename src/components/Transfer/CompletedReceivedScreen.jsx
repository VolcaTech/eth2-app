import React, { Component } from 'react';
import { getEtherscanLink } from './components';
import TransferStepsBar from './../common/TransferStepsBar';
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
	marginTop: 60
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
	  <div className="text-center">
	    <div style={styles.titleContainer}>
	      
	      { transfer.status === 'received' ?     
		  /* received status if user has received,
		   completed - if someone else */
		  <div className="title center">
			You received <span className="text-blue">{transfer.amount}</span>
			    <span className="text-gray"> ETH</span>
		      </div> :
		      <div className="title center">
			<span className="text-blue">{transfer.amount}</span> 
			    <span className="text-gray"> ETH</span> received
			  </div>
		  }
	    </div>
	    
	    <div style={styles.helpContainer}>
	      <div className="text">Transaction details on <a href={etherscanLink} className="link">Etherscan</a> 
	      </div>	      
	    </div>
	    <div style={styles.buttonContainer}>
	      <a href="https://dapps.trustwalletapp.com/" className="btn-inverted no-underline">
		<div>
		  <span>How to spend</span>
		</div>
	      </a>
	    </div>
	    
	  </div>
	</div>
    );
}


export default CompletedSentScreen;
