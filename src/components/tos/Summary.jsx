import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


const styles = {
    title: {
        fontSize: 36,
        fontFamily: 'SF Display Black',
        textAlign: 'left',
        lineHeight: 1,
        marginBottom: 50,
        color: '#0099ff'
    },
    text: {
        fontSize: 24,
        fontFamily: 'SF Display Regular',
        lineHeight: 1,
        textAlign: 'left',
        marginBottom: 50
    },
    textBlue: {
        color: '#0099ff',
        display: 'inline'
    },
    boldBlue: {
        color: '#0099ff',
        fontFamily: 'SF Display Black',
        display: 'inline'
    },
    link: {
        textDecoration: 'none',
        color: '#0099ff',
    }
}



class Summary extends React.Component {


    render() {
        return (
            <div>
                <div style={styles.title}>Summary</div>
                <div style={styles.text}><div style={styles.textBlue}>Eth2Phone is a web application (a website that the user can interact with (the “Site”) that runs on the Ethereum network, using specially-developed Smart Contracts</div> (each, a “Smart Contract”) to enable users to send and receive Ether, verifying themselves via phone number. The Smart Contracts and the Site are collectively referred to in these Terms as the “App”.</div>
                <div style={styles.text}>
                    <div style={styles.boldBlue}>1.</div><div style={styles.textBlue}> The product is still in beta and you are solely responsible for the security of your assets</div>, and your wallet (Trust Wallet or other Ethereum wallets and accounts)
<br />
                    <br />
                    <div style={styles.boldBlue}>2.</div><div style={styles.textBlue}> We neither own nor control Trust Wallet, MetaMask, Coinbase, Google Chrome, the Ethereum network, or any other wallet, third party site, product, or service</div> that you might access, visit, or use for the purpose of enabling you to use the various features of the App. We will not be liable for the acts or omissions of any such third parties, nor will we be liable for any damage that you may suffer as a result of your transactions or any other interaction with any such third parties. Simply speaking, we have no control on how transactions are carried out within your chosen wallet and have no responsibilities for that.
<br />
                    <br />
                    <div style={styles.boldBlue}>3.</div><div style={styles.textBlue}> You agree to use the App only for purposes that are legal</div>, proper and in accordance with these Terms and any applicable laws or regulations.
                    <br />
                    <br />
                    <div style={styles.boldBlue}>4.</div><div style={styles.textBlue}> Using the App you will need to pay a Gas Fee for each transaction that occurs via the App.</div> The gas fee is essential to using the Ethereum blockchain network and will be automatically calculated and included by us into the transaction. When sending assets, you will be shown the final amount to be paid. Please be aware of that.
                    <br />
                    <br />
                    <div style={styles.boldBlue}>5.</div> Except as expressly set forth herein, <div style={styles.textBlue}>your use of the App does not grant you ownership of or any other rights with respect to any content, code, data, or other materials</div> that you may access on or through the App.
                    <br />
                    <br />
                    <div style={styles.boldBlue}>6.</div><div style={styles.textBlue}> You affirm that you are over the age of 13</div>, as the App is not intended for children under 13. Please check the “Сhildren” section below for more info.
                    <br />
                    <br />
                    <div style={styles.boldBlue}>7.</div><div style={styles.textBlue}> Our <Link to="/privacy" style={styles.link}>Privacy Policy</Link> precisely describes the ways we collect, use, store and disclose your personal information</div>, and is hereby incorporated by this reference into these Terms.

                    </div>
            </div>

        )
    }
}


export default Summary;
