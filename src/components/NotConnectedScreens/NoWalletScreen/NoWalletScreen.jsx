import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import { Row, Col, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
const qs = require('querystring');
import styles from './styles';
import wallets from './wallets';
import ButtonPrimary from '../../../components/common/ButtonPrimary';
import WalletSlider from './WalletSlider';



class NoWalletScreen extends Component {
    constructor(props) {
        super(props);

        let selectedWallet, walletIcon, walletURL;
        const queryParams = qs.parse(props.location.search.substring(1));

        // parse url params
        const walletFromLink = (queryParams.wallet || queryParams.w);

	if (walletFromLink && wallets[walletFromLink]) {
	    selectedWallet = wallets[walletFromLink];
	} else {
	    // select Trust Wallet by default
	    selectedWallet = wallets.trust;
	}
	    
        this.state = {
            selectedWallet,
            disabled: true,
            deepLink: false,
            showCarousel: false,
            showInstruction: false
        };
    }
    componentDidMount() {
        this._getDeepLink();
    }

    async _getDeepLink() {
        var dappUrl = encodeURIComponent(window.location);
        const host = 'https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url'; // trust wallet deep link
        // const host = 'https://tokenpocket.github.io/applink?dappUrl'; // Token Poket deep link
        const deepLink = `${host}=${dappUrl}`;
        this.setState({ deepLink });
    }

    _selectWallet(walletName) {
	const wallet = wallets[walletName];
        this.setState({
	    selectedWallet: wallet,
	    showCarousel: false
	});
    }

    _renderForMobile() {
	
	const walletIcon = `https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/${this.state.selectedWallet.id}.png`;
	return (
            <div>
              <div><img src={walletIcon} style={styles.largeWalletIcon} /></div>
              <div style={{ ...styles.title, marginTop: 10 }}>You need wallet to<br />send or receive ether</div>
              <a href={this.state.selectedWallet.name === 'Trust' ? this.state.deepLink : this.state.selectedWallet.walletURL} style={styles.button} target="_blank"> Use {this.state.selectedWallet.name} </a>
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
