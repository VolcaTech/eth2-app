import React, { Component } from 'react';
import { TxDetailsBox, ShareButton } from './components';


const styles = {
    container: {
	display: 'flex',
	flexDirection: 'column',
	alignContent: 'space-between',
	height: 220 
    },
    title: {
	width: '70%',
	display: 'block',
	margin: 'auto',
	fontSize: 18,
	fontFamily: 'SF Display Black',
	textAlign: 'center'
    },
    text1: {
	width: '90%',
	display: 'block',
	margin: 'auto',
	fontSize: 15,
	fontFamily: 'SF Display Regular',
	textAlign: 'center'
    },
    text2: {
	width: '80%',
	display: 'block',
	margin: 'auto',
	fontSize: 15,
	fontFamily: 'SF Display Regular',
	textAlign: 'center',
    },
    link: {
	width: '80%',
	display: 'block',
	margin: 'auto',
	wordWrap: 'break-word',
	fontSize: 12,
	color: '#0099ff',
	lineHeight: 1.3,
	fontFamily: 'SF Display Regular',
	textAlign: 'center',
	marginBottom: 43
    },
    bold: {
	fontFamily: "SF Display Bold",
	display: 'inline-block' 
    },
    detailsBox: { marginTop: 60 }
}


const PendingSentTransfer = ({ transfer }) => {
    return (
        <div>
            <div style={styles.container}>
                <div style={styles.title}>Transaction is processing</div>
                <div style={styles.text1}>Your <span style={styles.bold}> transaction has been broadcast </span> to the Ethereum network. It’s waiting to be mined and confirmed.</div>
		<ShareButton transfer={transfer} />
	    </div>
            <div style={styles.detailsBox}>
                <TxDetailsBox
                    txHash={transfer.txHash}
                    networkId={transfer.networkId}
                />
            </div>
        </div>
    );
}

export default PendingSentTransfer;
