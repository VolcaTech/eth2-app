import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import CompletedSentScreen from './CompletedSentScreen';
import CompletedReceivedScreen from './CompletedReceivedScreen';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import ButtonPrimary from './../common/ButtonPrimary';
import copy from 'copy-to-clipboard';



class PendingTransfer extends Component {
    _renderStepsContent() {
	const { transfer, currentStep } = this.props;
    let title;
    const phoneNumberWithoutPlus = transfer.receiverPhone.substring(1); // remove '+' from number
    let shareLink = `${ETH2PHONE_HOST}/#/receive?code=${transfer.secretCode}&phone=${phoneNumberWithoutPlus}`;

    // add network id to url params if not mainnet
    if (transfer.networkId != "1") {
	shareLink += `&chainId=${transfer.networkId}`;
    }
	switch (currentStep) {
	case 2:
	    return (
		<div>
		  <div style={styles.title}>Transaction is processing</div>
		  <div style={styles.text1}>Your <div style={{fontFamily: "SF Display Bold", display: 'inline-block'}}> transaction has been broadcast </div> to the Ethereum network. It’s waiting to be mined and confirmed.</div>
		  <div style={styles.text1}>Share this link with recipient by copying into clipboard</div>          
          <div style={styles.link}>
	    { shareLink }
	  </div>
      <div>
	    <ButtonPrimary buttonColor='#0099ff' handleClick={() => {
		  // copy share link to clipboard
		  copy(shareLink);
		  alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
	      }}>
	      Share link
	    </ButtonPrimary>
	  </div>
		</div>
	    );
	case 3:
	    if (transfer.status === 'deposited') {
		return (
		    <CompletedSentScreen phone={transfer.receiverPhone}
					 amount={transfer.amount} secretCode={transfer.secretCode}/>
		);
	    } else if (transfer.status === 'received') {
		return (
		    <CompletedReceivedScreen receiverAddress={transfer.receiverAddress}
					     amount={transfer.amount}
					     txHash={transfer.txHash}/>
		);
	    }
	}
    }
    
    render() {
	const { transfer, currentStep, error } = this.props;
	console.log({ transfer, currentStep });

	if (error) {
	    return (<div style={{color: 'red'}}>{error}</div>);
	}
	
	return (
            <div style={{ alignContent: 'center' }}>
              <div><img src={e2pLogo} style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28 }} /></div>	      
	      
	      <div>
		<div style={{ marginBottom: 57 }}>
		  <TransferStepsBar step={currentStep} />
		</div>
		<div style={{ textAlign: 'center' }}>
		  {this._renderStepsContent()}
		</div>	      
	      </div>
	    </div>
	);
	
    }
}

const styles = {
    title: { width: 225, height: 26, display: 'block', margin: 'auto', fontSize: 18, fontFamily: 'SF Display Black', textAlign: 'center', marginBottom: 9 },
    text1: { width: 340, height: 29, display: 'block', margin: 'auto', fontSize: 12, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    text2: { width: 268, height: 15, display: 'block', margin: 'auto', fontSize: 12, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    link: { width: 259, height: 43, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 12, color: '#0099ff', lineHeight: 1.3, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 43 },    
}

const mapStateToProps = (state, props) => {
    console.log(state.web3Data);
    let currentStep = 2;
    const transferId = props.match.params.transferId;
    const networkId = state.web3Data.networkId;
    const transfer = getAllTransfers(state).filter(transfer => transfer.id === transferId)[0] || {};
    if (transfer && (transfer.status === 'deposited' ||
		     transfer.status === 'cancelled' ||
		     transfer.status === 'received')) {
	currentStep = 3;
    }
    let error = "";
    if (!transfer || !transfer.id) {
	error = "Transfer not found. Check the url!";
    }
    
    console.log({state, props});
    return {
	transfer,
	currentStep,
	error
    };
}


export default connect(mapStateToProps)(PendingTransfer);


