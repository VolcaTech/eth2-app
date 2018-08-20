import React, { Component } from 'react';
import getDeepLinkForTrustWallet from './../../services/trustDeepLinkService';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import WalletSlider from './WalletSlider'
import RetinaImage from 'react-retina-image';
import { Row, Col, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


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
    row: {
        width: '80%',
        margin: 'auto',
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonRow: {
	display: 'flex',
	flexDirection: 'row',
	width: 300,
	margin: 'auto',
	marginBottom: 30,
	justifyContent: 'center'
    },
    button: {
	display: 'flex',
	flexDirection: 'column',
	alignContent: 'center',
	justifyContent: 'center',
	width: 243,
	height: 38,
	borderRadius: 12,
	marginTop: 'auto',
	marginBottom: 'auto',
	backgroundColor: '#0099ff',
	borderColor: '#0099ff',
	fontSize: 18,
	fontFamily: 'SF Display Black',
	textAlign: 'center',
	textDecoration: 'none',
	color: 'white'
    },
    logoText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SF Display Regular'
    },
    supported: {
	fontSize: 14,
	textAlign: 'center',
	fontFamily: "SF Display Bold"
    },
    walletLogoContainer: {
	flex: 1
    },
    logo: {
	margin: 'auto'
    },
    instructionsText: {
	fontFamily: "SF Display Regular",
	fontSize: 14
    },
    instructionsTextBold: {
	display: 'inline',
	fontFamily: 'SF Display Bold'
    },
    instructionsContainer: {
	width: 300,
	display: "flex",
	margin: "auto",
	textAlign: 'left',
	verticalAlign: "text-top",
	marginTop: 25,
	marginBottom: 25,
	flexDirection: "column",
	justifyContent: "space-between"
    },
}


class NoWalletScreen extends Component {
    render() {
        return (
            <div>
                <div style={styles.title}>You need wallet to<br />send or receive ether</div>
                {window.innerWidth < 769 ?
                    (
                <WalletsList />          
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
            </div>
        );
    }
}


const WalletsList = () => {
    return (
        <div>
            {/* <Row style={styles.row}>
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
		  <RetinaImage className="img-responsive" style={styles.logo} src="https://eth2.io/images/toshi.png" />		  		  
                  <div style={styles.logoText}>Toshi</div>
                </div>
                <div style={styles.walletLogoContainer}>
		  <RetinaImage className="img-responsive" style={styles.logo} src="https://eth2.io/images/token_pocket.png" />		  		  
                    <div style={styles.logoText}>Token Pocket</div>
                </div>
		
            </div> */}
                        <WalletSlider/>
        </div>
    )
}


export default NoWalletScreen;
