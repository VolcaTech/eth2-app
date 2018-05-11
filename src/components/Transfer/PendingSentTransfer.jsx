import React, { Component } from 'react';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
import { TxDetailsBox } from './components';


const styles = {
    title: { width: '70%', height: 26, display: 'block', margin: 'auto', fontSize: 18, fontFamily: 'SF Display Black', textAlign: 'center', marginBottom: 9 },
    text1: { width: '90%', height: 29, display: 'block', margin: 'auto', fontSize: 12, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 0 },
    text2: { width: '80%', height: 15, display: 'block', margin: 'auto', fontSize: 12, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    link: { width: '80%', height: 43, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 12, color: '#0099ff', lineHeight: 1.3, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 43 },
}


const PendingSentTransfer = ({ transfer }) => {
    let title;
    const phoneNumberWithoutPlus = (transfer.receiverPhone || "").substring(1); // remove '+' from number
    let shareLink = `${ETH2PHONE_HOST}/#/receive?code=${transfer.secretCode}&phone=${phoneNumberWithoutPlus}`;
    // add network id to url params if not mainnet
    if (transfer.networkId != "1") {
        shareLink += `&chainId=${transfer.networkId}`;
    }

    return (
        <div>
            <div style={styles.title}>Transaction is processing</div>
            <div style={styles.text1}>Your <div style={{ fontFamily: "SF Display Bold", display: 'inline-block' }}> transaction has been broadcast </div> to the Ethereum network. It’s waiting to be mined and confirmed.</div>
            <div style={{ marginTop: 36 }}>
                <div style={styles.text1}>Copy and share the link with recipient</div>
                <div style={{ display: 'block', margin: 'auto', width: '78%' }}><ButtonPrimary buttonColor='#0099ff' handleClick={() => {
                    // copy share link to clipboard
                    copy(shareLink);
                    alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
                }}>
                    Copy link
	    </ButtonPrimary>
                </div>
            </div>
            <div style={{ marginTop: 80 }}>
                <TxDetailsBox
                    txHash={transfer.txHash}
                    networkId={transfer.networkId}
                />
            </div>
        </div>
    );
}

export default PendingSentTransfer;
