import React from 'react';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
const ETH2PHONE_HOST = 'https://eth2.io';


const styles = {
    checkTransaction: {
	color: '#000000',
	fontSize: 15,	
	fontFamily: 'SF Display Regular',
    },
    etherscanLink: {
	fontSize: 14,		
	color: '#33aeff',
	fontFamily: 'SF Display Bold',
    },
    email: {
	fontSize: 15,		
	color: '#000000',
	fontFamily: 'SF Display Regular',
    },
    shareLinkContainer: {
	display: 'block',
	margin: 'auto',
	width: '70%'
    },
}


const shortHash = (hash, num, showEnd = true) => {
    const sanitized = (hash).substring(2);
    const shorten = `${sanitized.slice(0, 3)}...${showEnd ? sanitized.slice(-num) : ''}`;
    return '0x'.concat(shorten);
};

export const getEtherscanLink= ({txHash, networkId}) => {
    let subdomain = '';
    if (networkId == "3") {
	subdomain = 'ropsten.';
    }
    const etherscanLink = `https://${subdomain}etherscan.io/tx/${txHash}`;
    return etherscanLink;
}


export const TxDetailsBox = ({txHash, networkId}) =>{
    let subdomain = '';
    if (networkId == "3") {
	subdomain = 'ropsten.';
    }    
    const etherscanLink = getEtherscanLink({txHash, networkId});
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


export const ShareButton = ({transfer}) => {
    
    const phoneNumberWithoutPlus = (transfer.receiverPhone || "").substring(1); // remove '+' from number
    let shareLink = `${ETH2PHONE_HOST}/#/r?p=${phoneNumberWithoutPlus}`;
    // add network id to url params if not mainnet
    if (transfer.networkId != "1") {
        shareLink += `&n=${transfer.networkId}`;
    }

    let shareText = `Hi, I've sent you ${transfer.amount} eth.`;
    if (transfer.amount > 0.1) {
	shareText += `\n**To receive it copy whole message to the form on** - ${shareLink}`;
	shareText += `\n\nReceive code: ${transfer.secretCode}`;
	shareText += `\n(Code will be extracted automatically)`;
    } else {
	shareLink += `&c=${transfer.secretCode}`;
	shareText += `\nTo receive follow the link: ${shareLink}`;
    }
    
    return (
        <div style={styles.shareLinkContainer}>
	  <ButtonPrimary buttonColor='#0099ff' handleClick={() => {
                // copy share link to clipboard
                copy(shareText);
                alert("This link is copied to you clipboard. Share this link with receiver by sending link via messenger or email.");
            }}>
            Copy
	  </ButtonPrimary>
        </div>
    );
}

