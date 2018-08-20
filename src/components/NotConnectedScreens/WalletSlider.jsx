import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Slider from "react-slick";
import RetinaImage from 'react-retina-image';

const styles = {
    logoText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SF Display Regular',
        marginTop: -6
    },
    logo: {
        margin: 'auto',
        height: 80,
        width: 80
    },
    selectedColor: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0, 153, 255, 0.2)',
        borderRadius: 12
    },
    buttonRow: {
        display: 'flex',
        flexDirection: 'row',
        width: 300,
        margin: 'auto',
        marginBottom: 30,
        justifyContent: 'center'
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
    instructionsText: {
        fontFamily: "SF Display Regular",
        fontSize: 14
    },
    instructionsTextBold: {
        display: 'inline',
        fontFamily: 'SF Display Bold'
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
}

const wallets = [
    {
        text: "Trust",
        logo: "https://eth2.io/images/trust.png"
    },
    {
        text: "Metamask",
        logo: "https://eth2.io/images/metamask.png"
    },
    {
        text: "Toshi",
        logo: "https://eth2.io/images/toshi.png"
    },
    {
        text: "Token Pocket",
        logo: "https://eth2.io/images/token_pocket.png"
    },
    {
        text: "Cipher",
        logo: "https://eth2.io/images/cipher.png"
    }
]

class WalletSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWallet: '',
            disabled: true,
            deepLink: false
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

    _renderNextArrow = () => {
        return (
            <div>
                1
                </div>
        )
    }

    _renderPreviousArrow = () => {
        return (
            <div>
                1
                </div>
        )
    }

    render() {
        const settings = {
            arrows: true,

            fontSize: 10,
            slidesToShow: 4,
            slidesToScroll: 1,
            margin: 20,

        };
        const disabled = this.state.deepLink ? "" : "disabled";
        return (
            <div style={{ padding: 10 }}>
                <div>
                    <div style={{ ...styles.instructionsText, textAlign: 'center' }}> We recommend Trust Wallet </div>
                    <div style={styles.instructionsContainer}>
                        <div style={{ ...styles.instructionsText, fontFamily: 'SF Display Bold' }}>How to:</div>
                        <div style={styles.instructionsText}> 1. Download <div style={styles.instructionsTextBold}>Trust Wallet</div> (button below) </div>
                        <div style={styles.instructionsText}> 2. Create new or import existing wallet </div>
                        <div style={styles.instructionsText}> 3. Receive Ether (link will be open automatically) </div>
                    </div>
                    <div style={styles.buttonRow}>
                        <a className={`btn btn-primary ${disabled}`} href={this.state.deepLink || "#"} style={styles.button}> Use Trust Wallet </a>
                        <Link to="faq"><RetinaImage src="https://eth2.io/images/q.png" /> </Link>
                    </div>
                </div>
                <Slider {...settings}>
                    {wallets.map(wallet => {
                        return (
                            <WalletButtonContainer key={wallet.text} wallet={wallet} selectWallet={() => this.setState({ selectedWallet: wallet.text })} selected={wallet.text === this.state.selectedWallet ? true : false} />
                        )
                    })}
                </Slider>
            </div>
        );
    }
}

const WalletButtonContainer = ({ wallet, selectWallet, selected }) => {
    let containerStyle
    selected === true ? containerStyle = styles.selectedColor : ''
    return (
        <div style={containerStyle} onClick={selectWallet} >
            <RetinaImage className="img-responsive" style={styles.logo} src={wallet.logo} />
            <div style={styles.logoText}>{wallet.text}</div>
        </div>
    )
}

export default WalletSlider;
