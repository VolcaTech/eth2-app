import React from 'react';
import { connect } from 'react-redux';
import ButtonPrimary from './../common/ButtonPrimary';
import copy from 'copy-to-clipboard';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';
import { TxDetailsBox } from './components';



const CompletedReceivedScreen = ({ receiverAddress, amount, txHash, networkId}) => {
    return (
	<div>
	  <div style={{ fontSize: 18, marginBottom: 17 }}>
	    <div style={{display: 'inline-block', marginRight: 5}}>You have successfully received</div>
	    <div style={{display: 'inline-block', color: '#2bc64f'}}>{amount} ETH</div>
	  </div>
	  <div style={{marginTop:80}}>
	    <TxDetailsBox
	       txHash={txHash}
	       networkId={networkId}
	       />
	  </div>
	</div>
    );
}


export default  connect(
    state => ({	networkId: state.web3Data.networkId})
)(CompletedReceivedScreen);

