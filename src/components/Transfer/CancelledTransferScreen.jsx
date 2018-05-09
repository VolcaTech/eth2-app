import React, { Component } from 'react';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
import { TxDetailsBox } from './components';


const styles = {
    title: { width: 225, height: 26, display: 'block', margin: 'auto', fontSize: 18, fontFamily: 'SF Display Black', textAlign: 'center', marginBottom: 9 },
    text1: { width: 340, height: 29, display: 'block', margin: 'auto', fontSize: 12, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    text2: { width: 268, height: 15, display: 'block', margin: 'auto', fontSize: 12, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 18 },
    link: { width: 259, height: 43, display: 'block', margin: 'auto', wordWrap: 'break-word', fontSize: 12, color: '#0099ff', lineHeight: 1.3, fontFamily: 'SF Display Regular', textAlign: 'center', marginBottom: 43 },    
}


const CancelledTransferScreen = ({transfer}) => {
    return (
	<div>
	  <div style={styles.title}>Transfer is cancelled</div>
	  <div style={{marginTop:80}}>
	    <TxDetailsBox
	       txHash={transfer.txHash}
	       networkId={transfer.networkId}
	       />
	  </div>	  
	</div>
    );
}


export default CancelledTransferScreen;
