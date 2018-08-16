import React from 'react';
import copy from 'copy-to-clipboard';
import ButtonPrimary from './../common/ButtonPrimary';
const ETH2PHONE_HOST = 'http://localhost:3000';// 'https://eth2.io';
const shareIcon = require('../../../public/images/share_icon.png');

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
    shareIcon: {
        position: 'absolute',
        marginLeft: 20,
        marginTop: 3,
        width: 22.5
    }
}


const shortHash = (hash, num, showEnd = true) => {
    const sanitized = (hash).substring(2);
    const shorten = `${sanitized.slice(0, 3)}...${showEnd ? sanitized.slice(-num) : ''}`;
    return '0x'.concat(shorten);
};

export const getEtherscanLink = ({ txHash, networkId }) => {
    let subdomain = '';
    if (networkId == "3") {
        subdomain = 'ropsten.';
    }
    const etherscanLink = `https://${subdomain}etherscan.io/tx/${txHash}`;
    return etherscanLink;
}



export const ShareButton = ({ transfer }) => {
    let shareLink;
    let shareText = `Hi, I've sent you ${transfer.amount} eth.`;
    if (transfer.receiverPhone) {
        const phoneNumberWithoutPlus = (transfer.receiverPhone || "").substring(1); // remove '+' from number
        shareLink = `${ETH2PHONE_HOST}/#/r?p=${phoneNumberWithoutPlus}&c=${transfer.secretCode}`;
    } else if (transfer.transitPrivateKey) {
        shareLink = `${ETH2PHONE_HOST}/#/r?pk=${transfer.transitPrivateKey}`;
    }
    
    if (transfer.networkId != "1") {
        shareLink += `&n=${transfer.networkId}`;
    }
    
    shareText += `\nTo receive follow the link: ${shareLink}`;


    return (
        <div style={styles.shareLinkContainer}>
            <ButtonPrimary buttonColor='#2bc64f' handleClick={() => {
                // copy share link to clipboard
                copy(shareText);
                alert("The link is copied to your clipboard. Share the link with receiver");
            }}>
                <span>Copy & Share Link</span>
                <img src={shareIcon} style={styles.shareIcon} className="hidden-iphone5" />
            </ButtonPrimary>
        </div>
    );
}
