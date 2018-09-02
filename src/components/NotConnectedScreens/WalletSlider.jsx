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
        height: 60,
        width: 60,
        margin: 7,
        borderRadius: 15,
        WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)'
    },
    logo5: {
        height: 45,
        width: 45,
        margin: 7,
        borderRadius: 12.5,
        WebkitBoxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)'
    },
    title: {
        textAlign: 'center',
        fontFamily: "SF Display Semibold",
        fontSize: 20,
        marginBottom: 25,
        marginTop: 20
    },
    containerStyle: {

    },
    nextArrow: { width: 20, height: 20, position: 'absolute', top: 25, right: 0, textAlign: 'right' },
    prevArrow: { height: 20, float: 'left', top: 25, paddingTop: 26 }
}

const wallets = [
    {
        text: "Trust",
        logo: "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/trust.png",
        link: "https://trustwalletapp.com"
    },
    {
        text: "Opera",
        logo: "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/opera.png",
        link: "https://www.opera.com/download"
    },
    {
        text: "Coinbase Wallet",
        logo: "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/coinbase_wallet.png",
        link: "https://www.toshi.org"
    },
    {
        text: "Token Pocket",
        logo: "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/token_pocket.png",
        link: "https://tokenpocket.jp/index_en.html"
    },
    {
        text: "Cipher",
        logo: "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/cipher.png",
        link: "https://www.cipherbrowser.com"
    },
    {
        text: "Status",
        logo: "https://raw.githubusercontent.com/Eth2io/eth2-assets/master/images/status.png",
        link: "https://status.im/"
    }
]

class WalletSlider extends React.Component {
    _renderNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div style={window.innerWidth > 320 ? styles.nextArrow : { ...styles.nextArrow, top: 16 }} onClick={onClick}>
                <RetinaImage src="https://eth2.io/images/arrowRight.png" />
            </div>
        )
    }

    _renderPreviousArrow = (props) => {
        const { onClick } = props;
        return (
            <div style={window.innerWidth > 320 ? styles.prevArrow : { ...styles.prevArrow, paddingTop: 16 }} onClick={onClick}>
                <RetinaImage src="https://eth2.io/images/arrowLeft.png" />
            </div>
        )
    }

    render() {
        const settings = {
            arrows: true,
            padding: 7,
            nextArrow: <this._renderNextArrow />,
            prevArrow: <this._renderPreviousArrow />,
            fontSize: 10,
            slidesToShow: 4,
            slidesToScroll: 4,
        };
        return (
            <div style={{ padding: 10 }}>
                <div style={styles.title}>Choose your wallet:</div>
                <Slider {...settings}
                >
                    {wallets.map(wallet => {
                        if (wallet.text !== this.props.selectedWallet) {
                            return (
                                <WalletButtonContainer key={wallet.text} wallet={wallet} selectWallet={this.props.selectWallet} />
                            )
                        }
                    })}
                </Slider>
            </div>
        );
    }
}

const WalletButtonContainer = ({ wallet, selectWallet, selected }) => {
    let logoStyle;
    if (window.innerWidth > 320) {
        logoStyle = styles.logo
    } else {
        logoStyle = styles.logo5
    }
    return (
            <RetinaImage onClick={() => selectWallet(wallet.text, wallet.logo, wallet.link)} className="img-responsive" style={logoStyle} src={wallet.logo} />
    )
}

export default WalletSlider;
