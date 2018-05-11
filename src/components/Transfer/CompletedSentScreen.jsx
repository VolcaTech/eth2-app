import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonPrimary from './../common/ButtonPrimary';
import copy from 'copy-to-clipboard';
import { TxDetailsBox } from './components';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';


class CompletedSentScreen extends Component {
    constructor(props) {
        super(props);

    }


    _renderScreen(transfer, shareLink) {
        console.log("RENDER:", transfer)
        // add network id to url params if not mainnet
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: 'auto', width: '90%', height: 250 }}>
                <div style={{ display: 'block', margin: 'auto', width: '100%', fontSize: 18, fontFamily: 'SF Display Black' }}>
                    <div style={{ display: 'inline-block', marginRight: 5 }}>You've successfully sent</div>
                    <div style={{ display: 'inline-block', color: '#2bc64f' }}>{transfer.amount} ETH</div>
                    <div>to&nbsp;<div style={{ display: 'inline-block', color: '#0099ff' }}>{transfer.receiverPhone}</div></div>
                </div>
                <div style={{ display: 'block', margin: 'auto', width: '100%' }}>
                    <ButtonPrimary buttonColor='#0099ff' handleClick={() => {
                        // copy share link to clipboard
                        copy(shareLink);
                        alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
                    }}>
                        Copy link
	    </ButtonPrimary>
                </div>
                <div style={{ display: 'block', margin: 'auto' }}>
                    <TxDetailsBox
                        txHash={transfer.txHash}
                        networkId={transfer.networkId}
                    />
                </div>
            </div>
        )
    }

    render() {
        console.log("PROPS: ", this.props.transfer.receiverPhone)
        const transfer = this.props.transfer
        const phoneNumberWithoutPlus = transfer.receiverPhone.substring(1); // remove '+' from number
        let shareLink = `${ETH2PHONE_HOST}/#/receive?code=${transfer.secretCode}&phone=${phoneNumberWithoutPlus}`;
        if (transfer.networkId != "1") {
            shareLink += `&chainId=${transfer.networkId}`;
        }
        return (
            this._renderScreen(transfer, shareLink)
        );
    }

}


export default CompletedSentScreen;
