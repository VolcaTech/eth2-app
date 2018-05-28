import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import web3Service from './services/web3Service';
import SendTab from './components/SendTab/SendTab';
import ReceiveForm from './components/Receive/ReceiveForm';
import TransferComponent from './components/Transfer';
import Header from './components/common/Header';
import NoWalletHeader from './components/common/NoWalletHeader';
import { Loader } from './components/common/Spinner';
import ButtonPrimary from './components/common/ButtonPrimary';
import HistoryScreen from './components/HistoryScreen';
import e2pLogo from './assets/images/eth2phone-logo.png';
import TrustLogo from './assets/images/trust.png';
import Landing from './landing';
import FAQ from './faq';
import TOS from './tos';
import PrivacyPolicy from './privacy';
import escrowContract from './services/eth2phone/escrowContract';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import NoWalletScreen from './components/NotConnectedScreens/NoWalletScreen';


class App extends Component {
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


    _renderStaticRouter() {
        return (
            <Router>
                <div>
                    <NoWalletHeader />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route path="/about" component={Landing} />
                        <Route path="/faq" component={FAQ} />
                        <Route path="/tos" component={TOS} />
                        <Route path="/privacy" component={PrivacyPolicy} />                                                                        
                        <Route component={NoWalletScreen} />
                    </Switch>
                </div>
            </Router>
        );
    }

    render() {

        if (!this.props.loaded) {
            return (<Loader />);
        }

        if (!this.props.connected) {
            return this._renderStaticRouter();
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
                    <Header {...this.props} />

                    <Switch>
                        <Route exact path="/transfers/:transferId" component={TransferComponent} />
                        <Redirect from='/send' to='/' />

                        <Route path="/receive" component={ReceiveForm} />
                        <Route path='/r' render={(props) => {
                            return (
                                <Redirect to={{
                                    pathname: '/receive',
                                    search: props.location.search
                                }} />
                            );
                        }} />

                        <Route path="/history" component={HistoryScreen} />
                        <Route path="/about" component={Landing} />
                        <Route path="/faq" component={FAQ} />
                        <Route path="/privacy" component={PrivacyPolicy} />                                                                        
                        <Route path="/tos" component={TOS} />                                                
                        <Route component={SendTab} />
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
