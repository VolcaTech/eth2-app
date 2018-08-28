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
        height: 70,
        width: 70
    },
    logo5: {
        height: 55,
        width: 55
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
    prevArrow: { width: 19, height: 20, float: 'left', top: 25, paddingTop: 26 }
}

const wallets = [
    {
        text: "Trust",
        logo: "https://eth2.io/images/trust.png",
        link: "https://trustwalletapp.com"
    },
    {
        text: "Opera",
        logo: "https://eth2.io/images/opera.png",
        link: "https://www.opera.com/download"
    },
    {
        text: "Coinbase Wallet",
        logo: "https://eth2.io/images/toshi.png",
        link: "https://www.toshi.org"
    },
    {
        text: "Token Pocket",
        logo: "https://eth2.io/images/token_pocket.png",
        link: "https://tokenpocket.jp/index_en.html"
    },
    {
        text: "Cipher",
        logo: "https://eth2.io/images/cipher.png",
        link: "https://www.cipherbrowser.com"
    },
    {
        text: "Status",
        logo: "https://eth2.io/images/status.png",
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
        <div style={styles.containerStyle} onClick={() => selectWallet(wallet.text, wallet.logo, wallet.link)}>
            <RetinaImage className="img-responsive" style={logoStyle} src={wallet.logo} />
            {/* <div style={styles.logoText}>{wallet.text}</div> */}
        </div>
    )
}

export default WalletSlider;
