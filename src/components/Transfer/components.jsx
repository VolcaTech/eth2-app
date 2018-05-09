import React from 'react';

const styles = {
    // checkTransactionBox: {
    // 	width: 538,
    // 	height: 68,
    // },
    checkTransaction: {
	color: '#000000',
	fontSize: 12,	
	fontFamily: 'SF Display Regular',
    },
    etherscanLink: {
	fontSize: 12,		
	color: '#33aeff',
	fontFamily: 'SF Display Bold',
    },
    email: {
	fontSize: 12,		
	color: '#000000',
	fontFamily: 'SF Display Regular',
    }
    
}

const shortHash = (hash, num, showEnd = true) =>{
    const sanitized = (hash).substring(2);
    const shorten = `${sanitized.slice(0, 3)}...${showEnd ? sanitized.slice(-num) : ''}`;
    return '0x'.concat(shorten);
};


export const TxDetailsBox = ({txHash, networkId, style}) =>{
    console.log("erer")
    let subdomain = '';
    if (networkId == "3") {
	subdomain = 'ropsten.';
    }
    const etherscanLink = `https://${subdomain}etherscan.io/tx/${txHash}`;
    const shortLink = `${subdomain}etherscan.io/tx/${shortHash(txHash, 3)}`;
    
    return (
	<div>
	  <div>
	    <span style={styles.checkTransaction}>Transaction details: </span>
	    <a style={styles.etherscanLink} href={etherscanLink} target="_blank">{shortLink}</a>
	  </div>
	  <div>
	    <span style={styles.checkTransaction}> Have questions? Ask us: </span>
	    <span style={styles.email} href={'#'} target="_blank"> eth2phone@gmail.com </span>
	  </div>	  
	</div>
    );
}
