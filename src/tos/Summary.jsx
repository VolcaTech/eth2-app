import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';
import faqLogo from './../../public/images/faqillustration.png';


const styles = {
    container: { width: '75%', margin: 'auto' },
    row: {
        textAlign: 'center'
    },
    col1: { padding: 0, marginBottom: 140 },
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
    questionLink: { textDecoration: 'none', fontSize: 24, textAlign: 'left', fontFamily: 'SF Display Bold', color: '#0099ff', textAlign: 'left', marginBottom: 15 },
    questionLinkContainer: { marginBottom: 50 },
    questionContainer: { width: '77%', margin: 'auto', textAlign: 'left', marginBottom: 75 },
    question: { fontSize: 36, fontFamily: 'SF Display Black', marginBottom: 15 },
    answer: { fontSize: 24, fontFamily: 'SF Display Regular' },
}



class Form extends React.Component {


    render() {
        return (
            <div>
                <div style={styles.title}>Summary</div>
                    <div style={styles.text}>1. The App will only recognize you as a user, and you will only be able to interact with the App, if your Ethereum electronic wallet is connected and unlocked. There is no other way to interact directly with the App. For now we recommend using Trust Wallet to get the best experience, however you can use any other wallet. </div>
                    <div style={styles.text}>2. Transactions that take place on the App are managed and confirmed via the Ethereum blockchain. You understand that your Ethereum public address will be made publicly visible whenever you engage in a transaction on the App.</div>
                    <div style={styles.text}>3. We neither own nor control Trust Wallet, MetaMask, Coinbase, Google Chrome, the Ethereum network, or any other wallet, third party site, product, or service that you might access, visit, or use for the purpose of enabling you to use the various features of the App. We will not be liable for the acts or omissions of any such third parties, nor will we be liable for any damage that you may suffer as a result of your transactions or any other interaction with any such third parties.</div>
                    <div style={styles.text}>4. You must provide accurate and complete information when making a transaction via App. Even though we worked to create the system that will have maximum available security at the time, also making it possible to cancel wrong transactions, the product is still in beta and you are solely responsible for the security of your assets, and your  wallet (Trust Wallet or other Ethereum wallets and accounts). </div>                    
            </div>

        )
    }
}


export default Form;
