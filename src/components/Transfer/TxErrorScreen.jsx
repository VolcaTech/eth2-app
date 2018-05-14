import React, { Component } from 'react';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
import { TxDetailsBox } from './components';


const styles = {
    title: { width: '50%', display: 'block', margin: 'auto', fontSize: 18, fontFamily: 'SF Display Black', textAlign: 'center' },
    text1: { width: '90%', display: 'block', margin: 'auto', fontSize: 15, fontFamily: 'SF Display Regular', textAlign: 'center'},
    text2: { width: '90%', display: 'block', margin: 'auto', fontSize: 15, fontFamily: 'SF Display Regular', textAlign: 'center'},
    link: { width: 259, height: 43, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 12, color: '#0099ff', lineHeight: 1.3, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 43 },    
}


const PendingScreen = ({transfer}) => {
    
    return (
	<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200}}>
	  <div style={styles.title}>Transaction failed</div>
	  <div style={styles.text1}>Your <div style={{fontFamily: "SF Display Bold", display: 'inline-block', color: '#f04234'}}> transaction has failed </div>. Check transaction details on Etherscan.</div>
	  <div>
	    <TxDetailsBox
	       txHash={transfer.txHash}
	       networkId={transfer.networkId}
	       />
	  </div>	  
	</div>
    );
}


export default PendingScreen;
