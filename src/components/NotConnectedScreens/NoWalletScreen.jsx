import React, { Component } from 'react';
import getDeepLinkForTrustWallet from './../../services/trustDeepLinkService';
import ButtonPrimary from '../../components/common/ButtonPrimary';
import WalletSlider from './WalletSlider'
import RetinaImage from 'react-retina-image';
import { Row, Col, Grid } from 'react-bootstrap';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
const qs = require('querystring');


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
        margin: 'auto',
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
    howtoTitle: {
        fontFamily: 'SF Display Bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    instructionsText: {
        fontFamily: "SF Display Regular",
        fontSize: 14,
        marginBottom: 5
    },
    instructionsTextBold: {
        display: 'inline',
        fontFamily: "SF Display Bold",
        fontSize: 14,
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
    anotherWallet: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'SF Display Semibold',
        color: '#979797',
        marginTop: 20,
    }
}


class NoWalletScreen extends Component {
    constructor(props) {
        super(props);

        let selectedWallet, walletIcon, walletURL;
        const queryParams = qs.parse(props.location.search.substring(1));

        // parse phone params
        const walletFromLink = (queryParams.wallet || queryParams.w);

        switch (walletFromLink) {
            case 'trust':
                selectedWallet = "Trust";
                walletIcon = "https://eth2.io/images/trust.png";
                walletURL = "https://trustwalletapp.com";
                break;
            case 'opera':
                selectedWallet = "Opera"
                walletIcon = "https://eth2.io/images/opera.png";
                walletURL = "https://www.opera.com/download";
                break;
            // case 'portis':
            //     selectedWallet = "Portis";
            //     walletIcon = "https://eth2.io/images/toshi.png";
            //     walletURL = "https://www.toshi.org";
            //     break;                    
            case 'token_pocket':
                selectedWallet = "Token Pocket";
                walletIcon = "https://eth2.io/images/token_pocket.png";
                walletURL = "https://tokenpocket.jp/index_en.html";
                break;
            case 'toshi':
                selectedWallet = "Toshi";
                walletIcon = "https://eth2.io/images/toshi.png";
                walletURL = "https://www.toshi.org";
                break;
            case 'status':
                selectedWallet = "Status";
                walletIcon = "https://eth2.io/images/status.png";
                walletURL = "https://status.im/";
                break;
            default:
                selectedWallet = "Trust";
                walletIcon = "https://eth2.io/images/trust.png";
                walletURL = "https://trustwalletapp.com";
                break;
        }

        this.state = {
            selectedWallet,
            walletIcon,
            walletURL,
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

    _selectWallet = (walletName, iconURL, walletURL) => {
        this.setState({ selectedWallet: walletName, walletIcon: iconURL, walletURL: walletURL, showCarousel: false })
    }


    render() {

        return (
            <div>
                {window.innerWidth < 769 ?
                    (
                        <div>
                            <div><RetinaImage src={this.state.walletIcon} style={{ display: 'block', margin: 'auto', marginTop: 50, width: 128, height: 128 }} /></div>
                            <div style={{ ...styles.title, marginTop: 10 }}>You need wallet to<br />send or receive ether</div>
                            <a href={this.state.selectedWallet === 'Trust' ? this.state.deepLink : this.state.walletURL} style={styles.button} target="_blank"> Open {this.state.selectedWallet} </a>
                            {this.state.showCarousel === true ? <WalletSlider selectWallet={this._selectWallet} /> :
                                <div style={styles.anotherWallet} onClick={() => this.setState({ showCarousel: true })}>Have another wallet?</div>

                            }
                            {this.state.showInstruction === true ? <div onClick={() => this.setState({ showInstruction: false })}><Instructions wallet={this.state.selectedWallet} /></div> : <RetinaImage style={{ display: 'block', margin: 'auto', marginTop: 40 }} src="https://eth2.io/images/q.png" onClick={() => this.setState({ showInstruction: true })} />}

                        </div>
                    ) :
                    (
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
                    )}
            </div>
        );
    }
}


const Instructions = ({ wallet }) => {
    return (
        <div style={styles.instructionsContainer}>
            <div style={styles.howtoTitle}>How to:</div>
            <div style={styles.instructionsText}> 1. Download/Open <div style={styles.instructionsTextBold}>{wallet}</div> (button above)</div>
            <div style={styles.instructionsText}> 2. Create new or import existing wallet </div>
            <div style={styles.instructionsText}> 3. Eth2.io will be opened automatically or <div style={styles.instructionsTextBold}>copy&paste</div> the claiming link in the browser and follow simple instructions </div>
        </div>
    )
}


export default NoWalletScreen;
