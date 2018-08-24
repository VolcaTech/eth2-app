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
        logo: "https://eth2.io/images/trust.png",
        link: "https://trustwalletapp.com"
    },
    {
        text: "Opera",
        logo: "https://eth2.io/images/opera.png",
        link: "https://www.opera.com/download"
    },
    {
        text: "Toshi",
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
    }
]

class WalletSlider extends React.Component {
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
        return (
            <div style={{ padding: 10 }}>
                
                <Slider {...settings}>
                    {wallets.map(wallet => {
                        return (
                            <WalletButtonContainer key={wallet.text} wallet={wallet} selectWallet={this.props.selectWallet} />
                        )
                    })}
                </Slider>
            </div>
        );
    }
}

const WalletButtonContainer = ({ wallet, selectWallet, selected }) => {
    let containerStyle
    return (
        <div style={containerStyle} onClick={() => selectWallet(wallet.text, wallet.logo, wallet.link)}>
            <RetinaImage className="img-responsive" style={styles.logo} src={wallet.logo} />
            <div style={styles.logoText}>{wallet.text}</div>
        </div>
    )
}

export default WalletSlider;
