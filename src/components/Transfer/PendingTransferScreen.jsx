import React, { Component } from 'react';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
import { TxDetailsBox } from './components';


const styles = {
    title: { width: 225, display: 'block', margin: 'auto', fontSize: 18, fontFamily: 'SF Display Black', textAlign: 'center', marginBottom: 9 },
    text1: { width: 340, height: 29, display: 'block', margin: 'auto', fontSize: 15, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    text2: { width: 268, height: 15, display: 'block', margin: 'auto', fontSize: 15, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    link: { width: 259, height: 43, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 15, color: '#0099ff', lineHeight: 1.3, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 43 },    
}


const PendingScreen = ({transfer}) => {
    let title;
    if (transfer.status === "cancelling") {
	title = (<div style={styles.title}>Cancelling transfer to {transfer.receiverPhone}</div>);
    } else {
	title = (<div style={{fontSize: 18, marginBottom: 17 }}> Receiving <span style={{color: '#2bc64f'}}>{transfer.amount} ETH</span> </div>);
    }
    
    return (
	<div>
	  {title}
	  <div style={styles.text1}>Your <div style={{fontFamily: "SF Display Bold", display: 'inline-block'}}> transaction has been broadcast </div> to the Ethereum network. It’s waiting to be mined and confirmed.</div>
	  <div style={{marginTop:80}}>
	    <TxDetailsBox
	       txHash={transfer.txHash}
	       networkId={transfer.networkId}
	       />
	  </div>	  
	</div>
    );
}


export default PendingScreen;
