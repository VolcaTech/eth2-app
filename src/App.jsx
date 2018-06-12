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
import Landing from './components/landing';
import FAQ from './components/faq';
import TOS from './components/tos';
import PrivacyPolicy from './components/privacy';
import escrowContract from './services/eth2phone/escrowContract';
import { HashRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import NoWalletScreen from './components/NotConnectedScreens/NoWalletScreen';
import UnsupportedNetwork from './components/NotConnectedScreens/UnsupportedNetwork';


class App extends Component {
    _renderWrongNetwork() {
        return (
            <div>
                <NoWalletHeader />
                <UnsupportedNetwork />
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

        if (!this.props.connected || !this.props.address) {
            return this._renderStaticRouter();
        }

        if (this.props.networkId != "3" && this.props.networkId != "1") {
            return this._renderWrongNetwork();
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


function mapStateToProps(state) {
    console.log({state});    
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
