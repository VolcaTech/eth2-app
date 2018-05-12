import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransferStepsBar from './../common/TransferStepsBar';
import { getAllTransfers } from '../../data/selectors';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import CompletedSentScreen from './CompletedSentScreen';
import CompletedReceivedScreen from './CompletedReceivedScreen';
import PendingSentScreen from './PendingSentTransfer';
import PendingTransferScreen from './PendingTransferScreen';
import CancelledTransferScreen from './CancelledTransferScreen';
import HistoryScreen from './../HistoryScreen';
import E2PCarousel from './../common/E2PCarousel';
import TxErrorScreen from './TxErrorScreen';


class PendingTransfer extends Component {
    
    _renderStepsContent() {
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
                    <PendingTransferScreen transfer={transfer} />
                );
            case 'deposited':
            case 'sent':
                return (
                    <CompletedSentScreen transfer={transfer} />
                );
            case 'received':
                return (
                    <CompletedReceivedScreen receiverAddress={transfer.receiverAddress}
                        amount={transfer.amount}
                        txHash={transfer.txHash} />
                );
            case 'cancelling':
                return (
                    <PendingTransferScreen transfer={transfer} />
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
        console.log({ transfer, currentStep });

        if (transfer.isError) currentStep = 'fail'

        if (error) {
            return (<div style={{ color: 'red' }}>{error}</div>);
        }

        const History = (
            <div style={{ marginTop: 25 }}>
                <HistoryScreen />
            </div>
        );

        const TransferScreen = (
            <div>        
        <div style={{ alignContent: 'center' }}>
            <div style={{ display: 'block', margin: 'auto', marginTop: 17, marginBottom: 28, width: 30 }}><img src={e2pLogo} /></div>

            <div>
                <div style={{ marginBottom: 57 }}>
                    <TransferStepsBar step={currentStep} />
                </div>
                <div style={{ textAlign: 'center' }}>
                    {this._renderStepsContent()}
                </div>
            </div>
        </div>
        </div>
        
        )

        return (
            <div><E2PCarousel slides={[TransferScreen, History]} {...this.props} /></div>
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

    console.log({ state, props });
    return {
        transfer,
        currentStep,
        error
    };
}


export default connect(mapStateToProps)(PendingTransfer);


