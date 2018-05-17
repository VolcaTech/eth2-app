import React, { Component } from 'react';
import getDeepLinkForTrustWallet from './../../services/trustDeepLinkService';
import TrustLogo from './../../assets/images/trust-logo.png';
import e2pLogo from './../../assets/images/eth2phone-logo.png';
import ButtonPrimary from '../../components/common/ButtonPrimary';

const styles = {
    e2pLogo: { display: 'block', margin: 'auto', marginTop: 150, marginBottom: 35 },
    trustLogo: { display: 'block', margin: 'auto', marginTop: 150, marginTop: 38 },    
    title: { fontSize: 18, display: "block", margin: "auto", width: 319, fontFamily: "SF Display Black", textAlign: 'center' },
    supported: { fontSize: 18, display: "block", margin: "auto", width: 163, marginTop: 61, fontFamily: "SF Display Black" },
    instructionsText: { fontFamily: "SF Display Regular", fontSize: 12, opacity: 0.8 },
    instructionsContainer: { width: 290, display: "flex", margin: "auto", textAlign: 'center', verticalAlign: "text-top", marginTop: 33, flexDirection: "column", justifyContent: "space-between" },
    linkText: { display: "inline-block", fontSize: 12, fontFamily: "SF Display Bold", color: "#0099ff" },
    blueColor: '#0099ff'    
}


class NoWalletScreen extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    disabled: false,
	    deepLink: true
	};
	
	this._getDeepLink();	
    }

    async _getDeepLink() {
	const result = await getDeepLinkForTrustWallet(window.location.href);
	console.log({result});
	this.setState({deepLink: result.url});
    }
    

    
    render() {
	const disabled = this.state.deepLink ? "" : "disabled";
        return (
            <div style={{ alignContent: 'center' }}>
              <div><img src={e2pLogo} style={styles.e2pLogo} /></div>
              <div style={styles.title}>You need wallet to receive ether</div>
              <div style={styles.instructionsContainer}>
                <div style={styles.instructionsText}> 1. Download Trust Wallet </div>
                <div style={styles.instructionsText}> 2. Generate or import wallet . </div>
                <div style={styles.instructionsText}> 3. Receive ether. </div>				
		<a className={`btn btn-primary ${disabled}`} href={this.state.deepLink||"#"} style={{marginTop:20}}> Open Trust Wallet </a>
		
                <div style={styles.supported}>Supported wallets</div>
		
                <div><img src={TrustLogo} style={styles.trustLogo} /></div>                        
              </div>
            </div>
        );
    }
}
	

export default NoWalletScreen;
