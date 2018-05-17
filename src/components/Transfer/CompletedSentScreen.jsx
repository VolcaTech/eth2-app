import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonPrimary from './../common/ButtonPrimary';
import copy from 'copy-to-clipboard';
import { TxDetailsBox, ShareButton } from './components';
const ETH2PHONE_HOST = 'https://eth2phone.github.io';

const styles = {
    container: {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	margin: 'auto',
	width: '90%',
	height: 250
    },
    titleContainer: {
	margin: 'auto',
	width: '100%'
    },
    title: {
	fontSize: 18,
	fontFamily: 'SF Display Black',	
    },
    amount: {
	color: '#2bc64f'
    },
    phone: {
	color: '#0099ff' 
    },
    txDetails: {
	display: 'block',
	margin: 'auto'
    }
}


class CompletedSentScreen extends Component {
    
    render() {
	const { transfer } = this.props;
        return (
	    <div style={styles.container}>
              <div style={styles.titleContiner}>
                <div style={styles.title}>You've successfully sent <span style={styles.amount}> {transfer.amount} ETH</span>
		  <br/>to <span style={styles.phone}>{transfer.receiverPhone}</span>
		</div>
              </div>
	      <ShareButton transfer={transfer}/>
              <div style={styles.txDetails}>
                <TxDetailsBox
                   txHash={transfer.txHash}
                   networkId={transfer.networkId}
                   />
              </div>
            </div>
        );
    }

}


export default CompletedSentScreen;
