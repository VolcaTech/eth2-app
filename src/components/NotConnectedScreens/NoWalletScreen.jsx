import React, { Component } from 'react';
import getDeepLinkForTrustWallet from './../../services/trustDeepLinkService';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import RetinaImage from 'react-retina-image';
import { Row, Col, Button, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
// import qLogo from './../../assets/images/q.png';
// import trustLogo from './../../assets/images/trust-mobile.png';
// import cipherLogo from './../../assets/images/cipher-mobile.png';
// import toshiLogo from './../../assets/images/toshi-mobile.png';
// import metamaskLogo from './../../assets/images/metamask-mobile.png';



const styles = {
    title: {
        width: '90%',
        height: 48,
        display: 'block',
        margin: 'auto',
        fontSize: 24,
        lineHeight: 1,
        fontFamily: 'SF Display Black',
        textAlign: 'center',
        marginBottom: 25,
        marginTop: 50
    },
    notConnectedButton: {
        width: 145,
        height: 22,
        borderRadius: 6,
        marginTop: 15,
        textAlign: 'center',
        border: '2px solid #999999',
        fontFamily: "SF Display Regular",
        fontSize: 12,
        color: '#999999',
        padding: 0,
        paddingTop: 1,
        paddingLeft: 5
    },
    redDot: {
        display: 'inline',
        color: '#e64437',
        marginLeft: 3
    },
    row: {
        width: '80%',
        margin: 'auto',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonRow: { display: 'flex', flexDirection: 'row', width: 300, margin: 'auto', marginBottom: 30, justifyContent: 'center' },
    button: { display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', width: 243, height: 38, borderRadius: 12, marginTop: 'auto', marginBottom: 'auto', backgroundColor: '#0099ff', borderColor: '#0099ff', fontSize: 18, fontFamily: 'SF Display Black', textAlign: 'center', textDecoration: 'none', color: 'white' },
    web3: { display: 'flex', justifyContent: 'flex-end', padding: 0 },
    headerRow: { height: 44, display: 'block', margin: 'auto', backgroundColor: 'white', alignItems: 'center', borderTop: '2px solid #f5f5f5', marginBottom: 10 },
    headerLogo1: { width: 55, height: 29, fontFamily: "SF Display Black", color: "black", fontSize: 24, letterSpacing: 1, textAlign: 'center', marginTop: 9 },
    headerLogo2: { letterSpacing: 0, display: 'inline', color: '#2bc64f' },
    logoText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SF Display Regular'
    },
    supported: { fontSize: 14, textAlign: 'center', fontFamily: "SF Display Bold" },
    walletLogoContainer: {
	// marginLeft: 3,
	// marginRight: 3
	flex: 1
    },
    logo: {
	margin: 'auto'
    },
    instructionsText: { fontFamily: "SF Display Regular", fontSize: 14 },
    instructionsTextBold: { display: 'inline', fontFamily: 'SF Display Bold' },
    instructionsContainer: { width: 300, display: "flex", margin: "auto", textAlign: 'left', verticalAlign: "text-top", marginTop: 25, marginBottom: 25, flexDirection: "column", justifyContent: "space-between" },
}


class NoWalletScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            deepLink: false
        };

        this._getDeepLink();
    }

    async _getDeepLink() {
        const result = await getDeepLinkForTrustWallet(window.location.href);
        this.setState({ deepLink: result.url });
    }

    render() {
        const disabled = this.state.deepLink ? "" : "disabled";
        return (
            <div>
                <NoWalletHeader />
                <div style={styles.title}>You need wallet to<br />receive Ether</div>
                {window.innerWidth < 769 ?
                    (
                        <div>
                            <div style={{ ...styles.instructionsText, textAlign: 'center' }}> We recommend Trust Wallet </div>
                            <div style={styles.instructionsContainer}>
                                <div style={{ ...styles.instructionsText, fontFamily: 'SF Display Bold' }}>How to:</div>
                                <div style={styles.instructionsText}> 1. Download <div style={styles.instructionsTextBold}>Trust Wallet</div> (button below) </div>
                                <div style={styles.instructionsText}> 2. Create new or import existing wallet </div>
                                <div style={styles.instructionsText}> 3. Receive Ether (link will be open automatically) </div>
                            </div>
                            <div style={styles.buttonRow}>
                                <a className={`btn btn-primary ${disabled}`} href={this.state.deepLink || "#"} style={styles.button}> Open Trust Wallet </a>
				<Link to="faq"><RetinaImage src="https://eth2.io/images/q.png" /> </Link>
                            </div>
                        </div>
                    ) :
                    (
                        <div>
                            <div style={{ ...styles.instructionsText, textAlign: 'center' }}> On desktop we recommend Metamask </div>
                            <div style={styles.instructionsContainer}>
                                <div style={{ ...styles.instructionsText, fontFamily: 'SF Display Bold' }}>How to:</div>
                                <div style={styles.instructionsText}> 1. Install Metamask Chrome Extension</div>
                                <div style={styles.instructionsText}> 2. Create new or import existing wallet </div>
                                <div style={styles.instructionsText}> 3. Receive Ether (link will be reload automatically) </div>
                            </div>
                            <div style={styles.buttonRow}>
                                <a href="https://metamask.io/" style={{...styles.button, backgroundColor: '#f5a623', borderColor: '#f5a623'}} target="_blank"> Install Metamask </a>
				<Link to="faq"><RetinaImage src="https://eth2.io/images/q.png" /> </Link>
                            </div>
                        </div>
                    )}
                <WalletsList />
            </div>
        );
    }
}

const NoWalletHeader = () => {
    return (
        <Grid>
            <Row>
                <Col xs={12}>
                    <Row style={styles.headerRow}>
                        <Col xs={6} style={{ padding: 0 }}>
                            <div style={styles.headerLogo1}>
                                Eth2<div style={styles.headerLogo2}>Phone</div></div>
                        </Col>
                        <Col style={styles.web3} xs={6}>
                            <div style={styles.notConnectedButton}>
                                Not connected to Web3
                               <div style={styles.redDot}>&#9679;</div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    )
}

const WalletsList = () => {
    return (
        <div>
            <Row style={styles.row}>
                <div style={styles.supported}>Supported wallets</div>
            </Row>

            <div style={{...styles.row, maxWidth: 400}}>
                <div style={styles.walletLogoContainer}>
		  <RetinaImage className="img-responsive" style={styles.logo} src="https://eth2.io/images/trust.png" />		  
                    <div style={styles.logoText}>Trust</div>
                </div>
                <div style={styles.walletLogoContainer}>
		  <RetinaImage className="img-responsive" style={styles.logo} src="https://eth2.io/images/metamask.png" />		  		  
                    <div style={styles.logoText}>Metamask</div>
                </div>
                <div style={styles.walletLogoContainer}>
		  <RetinaImage className="img-responsive" style={styles.logo} src="https://eth2.io/images/cipher.png" />		  		  
                    <div style={styles.logoText}>Cipher</div>
                </div>
                <div style={styles.walletLogoContainer}>
		  <RetinaImage className="img-responsive" style={styles.logo} src="https://eth2.io/images/toshi.png" />		  		  
                    <div style={styles.logoText}>Toshi</div>
                </div>
            </div>
        </div>
    )
}


export default NoWalletScreen;
