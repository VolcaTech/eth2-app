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


const TxErrorScreen = ({transfer}) => {
    let subtitle;
    const etherscanLink = getEtherscanLink({txHash: transfer.txHash, networkId: transfer.networkId});
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
	      <div className="title">Transaction failed</div>	      
	    </div>

	    { !transfer.fetchedFromServer ? (
		<div>
		  <div style={styles.subTitleContainer}>
		    <div className="text">
		      Something went wrong. Check details on<br/>
		      <a href={etherscanLink} className="link">Etherscan</a> and if transaction is out of gas<br/>
		      send Ether again with higher gas price</div>	      	    	      
		  </div>
		  
		  <div style={styles.helpContainer}>
		    <div className="text">
		      Also check FAQ or text us<br/>
		      in <a href="https://t.me/eth2io" className="link">Telegram</a> so we can help
		    </div>	      
		  </div>
		</div>
	    ) : (
		  <div>
		    <div style={styles.subTitleContainer}>
		      <div className="text">
			Something went wrong. You can reach us<br/>
			in <a href="https://t.me/eth2io" className="link">Telegram</a> so we can help
		    </div>
		    
		    <div style={styles.helpContainer}>
		      <div className="text">
			Transaction details on <a href={etherscanLink} className="link">Etherscan</a>
			</div>
		      </div>
		    </div>
		  </div>
	      )	}
	</div>
	</div>
    );
}


export default TxErrorScreen;
