import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import CompletedSentScreen from './CompletedSentScreen';
import CompletedReceivedScreen from './CompletedReceivedScreen';
import PendingSentScreen from './PendingSentTransfer';
import PendingReceiveScreen from './PendingReceiveScreen';
//import CancellingTransferScreen from './CancellingTransferScreen';



class PendingTransfer extends Component {
    _renderStepsContent() {
	const { transfer, currentStep } = this.props;

	switch (transfer.status) {
	case 'depositing':
	    return (
		<PendingSentScreen transfer={transfer}/>
	    );
	case 'receiving':
	    return (
		<PendingReceiveScreen transfer={transfer}/>
	    );	    
	case 'deposited':	    
	case 'sent':	    
	    return (
		<CompletedSentScreen transfer={transfer}/>
	    );	    
	case 'received':	    
	    return (
		<CompletedReceivedScreen receiverAddress={transfer.receiverAddress}
					 amount={transfer.amount}
					 txHash={transfer.txHash}/>
	    );
	// case 'cancelling':	    
	//     return (
	// 	<CancellingTransferScreen transfer={transfer}/>
	//     );	    	    
	default: {
	    alert("Unknown status: " + transfer.status);
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


const mapStateToProps = (state, props) => {
    console.log(state.web3Data);
    let currentStep = 2;
    const transferId = props.match.params.transferId;
    const networkId = state.web3Data.networkId;
    const transfer = getAllTransfers(state).filter(transfer => transfer.id === transferId)[0] || {};
    if (transfer && (transfer.status === 'deposited' ||
		     transfer.status === 'cancelled' ||
		     transfer.status === 'received' ||
		     transfer.status === 'sent'
		    )) {
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


