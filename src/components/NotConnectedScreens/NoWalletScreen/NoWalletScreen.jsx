import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import { Row, Col, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
const qs = require('querystring');
import styles from './styles';
import wallets from './wallets';
import ButtonPrimary from '../../../components/common/ButtonPrimary';
import WalletSlider from './WalletSlider';
import { getDeviceOS } from '../../../utils';


class NoWalletScreen extends Component {
    constructor(props) {
        super(props);

        let selectedWallet, walletIcon, walletURL;
        const queryParams = qs.parse(props.location.search.substring(1));

        // parse url params
        const walletFromLink = (queryParams.wallet || queryParams.w);

	// select Trust Wallet by default
	selectedWallet = wallets.trust;

	// if there is valid wallet id in url
	if (walletFromLink && wallets[walletFromLink]) {
	    const wallet = wallets[walletFromLink];
	    const os = this._getDeviceOS();

	    // if wallet from the url is supported by devices OS
	    if (wallet.mobile[os] && wallet.mobile[os].support === true) {
		selectedWallet = wallet;
	    }	    
	} 
	    
        this.state = {
            selectedWallet,
            disabled: true,
            showCarousel: false,
            showInstruction: false
        };
    }

    _getDeviceOS() {
	if (/Android/i.test(navigator.userAgent)) {
	    return 'android';
	}
	
	if ( /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	    return 'ios';
	}
	
	return 'other';
    }
    
    _getDeepLink() {
        var dappUrl = encodeURIComponent(window.location);
	const wallet = this.state.selectedWallet;
	const os = getDeviceOS();
	
	// if wallet is supported by devices OS
	if (!(wallet.mobile[os] &&
	      wallet.mobile[os].support === true &&
	      wallet.mobile[os].deepLink !== null)) {
	    return { link: wallet.walletURL, isDeepLink: false };
	} 
	
	return { link: wallet.mobile[os].deepLink(dappUrl), isDeepLink: true };
    }

    _selectWallet(walletName) {
	const wallet = wallets[walletName];
        this.setState({
	    selectedWallet: wallet,
	    showCarousel: false
	});
    }

    _renderForMobile() {	
	const { link, isDeepLink }  = this._getDeepLink();

	// if there is deep link for the wallet for the device OS
	if (isDeepLink) {
	    return this._renderWithDeepLink(link);
	}

	// if there is NO deep link
	return this._renderWithoutDeepLink(link);
    }


    _renderWithDeepLink(deepLink) {
	const walletIcon = `https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/${this.state.selectedWallet.id}.png`;	
	return (
            <div>
              <div><img src={walletIcon} style={styles.largeWalletIcon} /></div>
              <div style={{ ...styles.title, marginTop: 10 }}>You need wallet to<br />send or receive ether</div>
              <a href={deepLink} style={styles.button} target="_blank"> Use {this.state.selectedWallet.name} </a>
              {
		  this.state.showCarousel === true?
		      <WalletSlider selectWallet={this._selectWallet.bind(this)} selectedWallet={this.state.selectedWallet}/> :
   	   	      <div style={styles.anotherWallet} onClick={() => this.setState({ showCarousel: true })}>Have another wallet?</div>		      
  	      }
			  
   	      {
	        this.state.showInstruction === true ?
   	          <Instructions wallet={this.state.selectedWallet} /> :
		  <RetinaImage style={{ display: 'block', margin: 'auto', marginTop: 40 }} src="https://eth2.io/images/q.png" onClick={() => this.setState({ showInstruction: true })} />
  	      }
		    
            </div>
        );	
    }

    _renderWithoutDeepLink(link) {
	const walletIcon = `https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/${this.state.selectedWallet.id}.png`;

	// #TODO add this screen
	return (
            <div>
              <div><img src={walletIcon} style={styles.largeWalletIcon} /></div>
              <div style={{ ...styles.title, marginTop: 10 }}>How to use<br />{this.state.selectedWallet.name}</div>
   	      <Instructions wallet={this.state.selectedWallet} />	      
	      <WalletSlider selectWallet={this._selectWallet.bind(this)} selectedWallet={this.state.selectedWallet}/> 			  
            </div>
        );	
    }

    
    _renderForDesktop() {
	return(
            <div>
              <div style={styles.title}>You need wallet to<br />send or receive ether</div>
              <div style={{ ...styles.instructionsText, textAlign: 'center' }}> On desktop we recommend Metamask </div>
              <div style={styles.instructionsContainer}>
                <div style={{ ...styles.instructionsText, fontFamily: 'SF Display Bold' }}>How to:</div>
                <div style={styles.instructionsText}> 1. Install Metamask Chrome Extension</div>
                <div style={styles.instructionsText}> 2. Create new or import existing wallet </div>
                <div style={styles.instructionsText}> 3. Receive Ether (link will be reload automatically) </div>
              </div>
              <div style={styles.buttonRow}>
                <a href="https://metamask.io/" style={{ ...styles.button, backgroundColor: '#f5a623', borderColor: '#f5a623' }} target="_blank"> Install Metamask </a>
                <a href="https://info.eth2.io/faq"><RetinaImage src="https://eth2.io/images/q.png" /> </a>
              </div>
            </div>
        );
    }
    
    render() {
        return window.innerWidth < 769 ? this._renderForMobile() : this._renderForDesktop();
    }

}





const Instructions = ({ wallet }) => {
    return (
        <div style={styles.instructionsContainer}>
            <div style={styles.howtoTitle}>How to:</div>
            <div style={styles.instructionsText}> 1. Download/Open <div style={styles.instructionsTextBold}>{wallet.name}</div> (button above)</div>
            <div style={styles.instructionsText}> 2. Create new or import existing wallet </div>
            <div style={styles.instructionsText}> 3. Eth2.io will be opened automatically or <div style={styles.instructionsTextBold}>copy&paste</div> the claiming link in the browser and follow simple instructions </div>
        </div>
    )
}


export default NoWalletScreen;
