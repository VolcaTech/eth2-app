import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import CompletedTransferScreen from './CompletedTransferScreen';


class PendingTransfer extends Component {
    _renderStepsContent() {
	const { transfer, currentStep } = this.props;
	let title;
	switch (currentStep) {
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
    let currentStep = 2;
    const transferId = props.match.params.transferId;
    const transfer = getAllTransfers(state).filter(transfer => transfer.id === transferId)[0] || {};
    if (transfer && transfer.status === 'sent') {
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


