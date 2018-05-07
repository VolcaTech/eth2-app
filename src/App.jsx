import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import web3Service from './services/web3Service';
import SendTab from './components/SendTab/SendTab';
import ReceiveForm from './components/Receive/ReceiveForm';
import PendingTransferComponent from './components/PendingTransfer/PendingTransfer';
import Header from './components/common/Header.jsx';
import ButtonPrimary from './components/common/ButtonPrimary';
import HistoryScreen from './components/HistoryScreen';
import e2pLogo from './assets/images/eth2phone-logo.png';
import TrustLogo from './assets/images/trust-logo.png';
import escrowContract from './services/eth2phone/escrowContract';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import getDeepLinkForTrustWallet from './services/trustDeepLinkService';


class NotConnectedPage extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    deepLink: ''
	};
	this._getDeepLink();
    }


    async _getDeepLink() {
	const { url: deepLink } = await getDeepLinkForTrustWallet(window.location.href);
	this.setState({deepLink});
    }
    
    render() {
	const disabled = this.state.deepLink ? "" : "disabled";
        return (
            <div style={{ alignContent: 'center' }}>
              <div><img src={e2pLogo} style={styles.e2pLogo} /></div>
              <div style={styles.title}>You need wallet to receive Ethereum</div>
              <div style={styles.instructionsContainer}>
                <div style={styles.instructionsText}> 1. Get Trust Wallet </div>
                <div style={styles.instructionsText}> 2. Generate or import wallet . </div>
                <div style={styles.instructionsText}> 3. Receive ether. </div>				
		<a className={`btn btn-primary ${disabled}`} href={this.state.deepLink||"#"} style={{marginTop:20}}> Go To Trust Wallet </a>
                  <div style={styles.supported}>Supported wallets</div>
		  
                <div><img src={TrustLogo} style={styles.trustLogo} /></div>                        
              </div>
            </div>
        );
    }
}


class App extends Component {

    _renderNotConnected() {
	return <NotConnectedPage/>;	
    }

    _renderWrongNetwork() {
        return (
            <div>
              <div style={{ alignContent: 'center' }}>
                <div><img src={e2pLogo} style={styles.e2pLogo} /></div>
                <div style={styles.title}>{this.props.networkName} network is not supported</div>
                <div style={styles.instructionsContainer}>
                  <div style={styles.instructionsText}>Change network to one of the following:
		    <div style={styles.ethereum}> - Mainnet Ethereum (ETH)</div>
		    <div style={styles.ethereum}> - Ropsten</div>			  
		  </div>                       
                </div>
              </div>
	    </div>
        );
    }

    _renderNoAddress() {
        return (
            <div>
              <div style={{ alignContent: 'center' }}>
                <div><img src={e2pLogo} style={styles.e2pLogo} /></div>
                <div style={styles.title}>No ethereum address is found</div>
                <div style={styles.instructionsContainer}>
                  <div style={styles.instructionsText}>Check that your web3 wallet (i.e. Metamask) is unlocked.
		  </div>                       
                </div>
              </div>
	    </div>
        );
    }

    
    render() {
        if (!this.props.loaded) {
            return (
                <div>
                    Loading web3...
		</div>
            );
        }

        if (!this.props.connected) {
	    return this._renderNotConnected();
        }

        if (this.props.networkId != "3" && this.props.networkId != "1") {
	    return this._renderWrongNetwork();
        }

        if (!this.props.address) {
	    return this._renderNoAddress();
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
    title: { fontSize: 18, display: "block", margin: "auto", width: 319, fontFamily: "SF Display Black", textAlign: 'center' },
    supported: { fontSize: 18, display: "block", margin: "auto", width: 163, marginTop: 61, fontFamily: "SF Display Black" },
    instructionsText: { fontFamily: "SF Display Regular", fontSize: 12, opacity: 0.8 },
    instructionsContainer: { width: 290, height: 41, display: "flex", margin: "auto", textAlign: 'center', verticalAlign: "text-top", marginTop: 33, flexDirection: "column", justifyContent: "space-between" },
    linkText: { display: "inline-block", fontSize: 12, fontFamily: "SF Display Bold", color: "#0099ff" },
    ethereum: { display: "block", fontSize: 12, fontFamily: "SF Display Bold", opacity: 1, marginLeft: 3 }
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
