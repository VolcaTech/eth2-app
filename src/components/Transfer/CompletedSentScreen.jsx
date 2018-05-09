import React from 'react';
import { connect } from 'react-redux';
import ButtonPrimary from './../common/ButtonPrimary';
import copy from 'copy-to-clipboard';
import { TxDetailsBox } from './components';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';


const CompletedSentScreen = (({ transfer}) => {
    const phoneNumberWithoutPlus = transfer.receiverPhone.substring(1); // remove '+' from number
    let shareLink = `${ETH2PHONE_HOST}/#/receive?code=${transfer.secretCode}&phone=${phoneNumberWithoutPlus}`;

    // add network id to url params if not mainnet
    if (transfer.networkId != "1") {
	shareLink += `&chainId=${transfer.networkId}`;
    }
    return (
	<div>
	  <div style={{ fontSize: 18, marginBottom: 17 }}>
	    <div style={{display: 'inline-block', marginRight: 5}}>You have successfully sent</div>
	    <div style={{display: 'inline-block', color: '#2bc64f'}}>{transfer.amount} ETH</div>
	    <div style={{marginTop: 5}}>to {transfer.receiverPhone}</div>
	  </div>
	  <div style={{ fontSize: 12, marginTop: 28, marginBottom: 14 }}>Share this link with recipient by copying to clipboard</div>
	  <div>
	    <ButtonPrimary buttonColor='#0099ff' handleClick={() => {
		  // copy share link to clipboard
		  copy(shareLink);
		  alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
	      }}>
	      Copy link
	    </ButtonPrimary>
	  </div>
	  <div style={{marginTop:80}}>
	    <TxDetailsBox
	       txHash={transfer.txHash}
	       networkId={transfer.networkId}
	       />
	  </div>
	</div>
    );
    }
)


export default CompletedSentScreen;
