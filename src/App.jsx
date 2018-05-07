import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import web3Service from './services/web3Service';
import escrowContract from './services/eth2phone/escrowContract';
import SendTab from './components/SendTab/SendTab';
import ReceiveForm from './components/Receive/ReceiveForm';
import PendingTransferComponent from './components/PendingTransfer/PendingTransfer';
import Header from './components/common/Header.jsx';
import HistoryScreen from './components/HistoryScreen';
import e2pLogo from './assets/images/eth2phone-logo.png';
import TrustLogo from './assets/images/trust-logo.png';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {

    render() {
        if (!this.props.loaded) {
            return (
                <div>
                    Loading web3...
		</div>
            );
        }

        if (!this.props.connected) {
            return (
                <div style={{ alignContent: 'center' }}>
                    <div><img src={e2pLogo} style={styles.e2pLogo} /></div>
                    <div style={styles.title}>You need wallet to receive Ethereum</div>
                    <div style={styles.instructionsContainer}>
                        <div style={styles.instructionsText}>1. Go to the <div style={styles.linkText}>App Store</div> or <div style={styles.linkText}>Google Play</div> to get Trust wallet.</div>
                        <div style={styles.instructionsText}>2. Return here and follow the link</div>
                        <div style={styles.supported}>Supported wallets</div>
                    <div><img src={TrustLogo} style={styles.trustLogo} /></div>                        
                    </div>
                </div>
            );
        }

	if ( this.props.networkId != "3" && this.props.networkId != "1") {
	    return (
		<div>
		  Connected to {this.props.networkName} Network.
		  Only Ropsten is supported at the moment. Please switch to Ropsten Network and reload the page.
		</div>
            );
        }

        if (!this.props.address) {
            return (
                <div>
                    No address is provided. Check that Metamask is unlocked and reload the page.
		</div>
            );
        }

        return (
            <Router>
                <div>
                  <Header
		     address={this.props.address}
		     networkName={this.props.networkName}
		     contractAddress={this.props.contractAddress}
		     networkId={this.props.networkId}
		     balance={this.props.balance} />
                    <Switch>
                        <Route exact path="/" component={SendTab} />
                        <Route exact path="/transfers/:transferId" component={PendingTransferComponent} />
                        <Route path="/receive" component={ReceiveForm} />
                        <Route path="/history" component={HistoryScreen} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const styles = {
    e2pLogo: { display: 'block', margin: 'auto', marginTop: 150, marginBottom: 35 },
    trustLogo: { display: 'block', margin: 'auto', marginTop: 150, marginTop: 38 },    
    title: { fontSize: 18, display: "block", margin: "auto", width: 319, fontFamily: "SF Display Black" },
    supported: { fontSize: 18, display: "block", margin: "auto", width: 163, marginTop: 61, fontFamily: "SF Display Black" },
    instructionsText: { fontFamily: "SF Display Regular", fontSize: 12, opacity: 0.8 },
    instructionsContainer: { width: 290, height: 41, display: "flex", margin: "auto", textAlign: 'center', verticalAlign: "text-top", marginTop: 33, flexDirection: "column", justifyContent: "space-between" },
    linkText: { display: "inline-block", fontSize: 12, fontFamily: "SF Display Bold", color: "#0099ff" }
}

function mapStateToProps(state) {
    let balance, contractAddress;
    const web3 = web3Service.getWeb3();
    if (state.web3Data.balance) {
	balance = web3.fromWei(state.web3Data.balance, 'ether').toNumber();
	balance = balance.toFixed(4);	
    }

    if (state.web3Data.connected) {
	contractAddress = escrowContract.getContractAddress();
    }
    
    return {
        address: state.web3Data.address,
        contractAddress,
	balance,
        connected: state.web3Data.connected,
        networkId: state.web3Data.networkId,
        networkName: state.web3Data.networkName,
        loaded: state.web3Data.loaded
    };
}


export default connect(mapStateToProps)(App);
