import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';
import CompletedSentScreen from './CompletedSentScreen';
import DepositedScreen from './DepositedScreen';
import CompletedReceivedScreen from './CompletedReceivedScreen';
import PendingSentScreen from './PendingSentTransfer';
import ReceivingScreen from './ReceivingScreen';
import CancellingScreen from './CancellingScreen';
import CancelledTransferScreen from './CancelledTransferScreen';
import WithHistory from './../HistoryScreen/WithHistory';
import HistoryScreen from './../HistoryScreen';
import TxErrorScreen from './TxErrorScreen';
import { Row, Col } from 'react-bootstrap';


export class TransferScreen extends Component {
    
    _renderTranferDetails() {
        const { transfer, currentStep } = this.props;
	if (transfer.isError) {
	    return (<TxErrorScreen transfer={transfer}/>);
	}
	
        switch (transfer.status) {
        case 'depositing':
            return (
                <PendingSentScreen transfer={transfer} />
            );
        case 'receiving':
            return (
                <ReceivingScreen transfer={transfer} />
            );
        case 'deposited':
            return (
                <DepositedScreen transfer={transfer} />
            );	    
        case 'sent':
            return (
                <CompletedSentScreen transfer={transfer} />
            );
        case 'received':
            return (
                <CompletedReceivedScreen transfer={transfer} />
            );
        case 'cancelling':
            return (
                <CancellingScreen transfer={transfer} />
            );
        case 'cancelled':
            return (
                <CancelledTransferScreen transfer={transfer} />
            );
        default: {
            alert("Unknown status: " + transfer.status);
        }
        }
    }    
    
    render() {
        let { transfer, currentStep, error } = this.props;
	
	// if transfer not found
        if (error) {
            return (<div style={{ color: 'red' }}>{error}</div>);
        }
	
        return (

	      <Row>
		<Col sm={4} smOffset={4}>	
                  {this._renderTranferDetails()}		    
		</Col>
	      </Row>

        );
    }
}

const TransferScreenWithHistory = (props) => (
    <WithHistory {...props}>
      <TransferScreen {...props}/>
    </WithHistory>
);

const mapStateToProps = (state, props) => {
    const transferId = props.match.params.transferId;
    const transfer = getAllTransfers(state).filter(transfer => transfer.id === transferId)[0] || {};
    let error = "";
    if (!transfer || !transfer.id) {
        error = "Transfer not found. Check the url!";
    }

    return {
        transfer,
        error
    };
}


export default connect(mapStateToProps)(TransferScreenWithHistory);


