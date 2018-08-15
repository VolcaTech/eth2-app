import React from "react";
import Slider from "react-slick";
import RetinaImage from 'react-retina-image';

const styles = {
    logoText: {
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'SF Display Regular'
    },
    logo: {
        margin: 'auto'
    },
    selectedColor: {
        backgroundColor: 'beige'
    }
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
        text: "Trust",
        logo: "https://eth2.io/images/trust.png"
    }
]

class WalletSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWallet: ''
        };
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
        var settings = {
            arrows: true,

            fontSize: 10,
            slidesToShow: 4,
            slidesToScroll: 1,
            margin: 20,

        };
        console.log(this.state.selectedWallet)
        return (
            <div style={{ padding: 10 }}>
                <Slider {...settings}>
                    {wallets.map(wallet => {
                        return (
                            <WalletButtonContainer key={wallet.text} wallet={wallet} selectWallet={() => this.setState({ selectedWallet: wallet.text })} selected={wallet.text === this.state.selectedWallet ? true : false} />
                        )
                        })}
                    {/* <div style={{}}>
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
                <div style={{}}>
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
                </div> */}

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
