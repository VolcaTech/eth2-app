import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';

class PendingTransfer extends Component {
    
    render() {
	const { transfer, currentStep } = this.props;
	console.log({ transfer, currentStep });
        return (
	    <div>
	      <TransferStepsBar step={currentStep}/>
	      <div> { transfer.txHash } </div>
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
    console.log({state, props})
    return {
	transfer,
	currentStep
    };
}

export default connect(mapStateToProps)(PendingTransfer);


