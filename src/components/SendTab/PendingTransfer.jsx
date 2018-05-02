import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import ButtonPrimary from './../common/ButtonPrimary';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import copy from 'copy-to-clipboard';


const CompletedTransferScreen = ({ phone, secretCode, amount}) => {
    const shareLink = `${ETH2PHONE_HOST}/receive?code=${secretCode}&phone=${phone}`;
    return (
	<div>
	  <div style={{ fontSize: 18, marginBottom: 17 }}>
	    <div style={{display: 'inline-block', marginRight: 5}}>You have successfully sent</div>
	    <div style={{display: 'inline-block', color: '#2bc64f'}}>{amount} ETH</div>
	    <div style={{marginTop: 5}}>to {phone}</div>
	  </div>
	  <div style={{ fontSize: 12, marginBottom: 18 }}>Share this link with recipient by copying to clipboard</div>
	  <div style={{width: 258, height: 44, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 12, color: '#0099ff', lineHeight: 1.3}}>
	    { shareLink }
	  </div>
	  <div style={{marginTop: 28}}>
	    <ButtonPrimary buttonColor='#0099ff' onClick={() => {
		  // copy share link to clipboard
		  copy(shareLink);
		  alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
	      }}>
	      Share link
	    </ButtonPrimary>
	  </div>
	</div>
    );
}


class PendingTransfer extends Component {
    _renderStepsContent() {
	const { transfer, currentStep } = this.props;
	let title;
	switch (currentStep) {
	case 1:
	    return (
		<div>
		  <div style={{ fontSize: 18 }}>{title}</div>
		</div>

	    );
	case 2:
	    return (
		<div>
		  <div style={{ fontSize: 18 }}>Do not close app while processing</div>
		</div>
	    );
	case 3:
	    return (
		<CompletedTransferScreen phone={transfer.receiverPhone}
					 amount={transfer.amount} secretCode={transfer.secretCode}/>
	    );
	}
    }

    
    render() {
	const { transfer, currentStep } = this.props;
	console.log({ transfer, currentStep });
	
	return (
	    <div>
	      <div style={{ marginBottom: 57 }}>
		<TransferStepsBar step={currentStep} />
	      </div>
	      <div style={{ textAlign: 'center' }}>
		{this._renderStepsContent()}
	      </div>
	    </div>
	);
    }
}


const mapStateToProps = (state, props) => {
    let currentStep = props.step;
    const transfer = getAllTransfers(state).filter(transfer => transfer.id === props.transferId)[0] || {};
    if (transfer && transfer.status === 'sent') {
	currentStep = 3;
    }
    console.log({state, props});
    return {
	transfer,
	currentStep
    };
}


export default connect(mapStateToProps)(PendingTransfer);


