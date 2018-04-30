import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainTab from './components/MainTab';
import web3Service from "./services/web3Service";
import escrowContract from "./services/eth2phone/escrowContract";
import Web3StatusBar from './components/common/Web3StatusBar';
import Footer from './components/common/LinkFooter';
import Header from './components/common/Header';
import { updateAddress } from './actions';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            web3Loaded: false,
            noWeb3: false,
            contractAddress: ""
        };
    }

    _pollWeb3() {
        const component = this;
        let POLL_MAX_COUNTER = 2;
        let pollCounter = 0;

        return new Promise(function (resolve, reject) {
            function poll() {
                console.log("trying to load web3...");
                pollCounter += 1;
                web3Service.setup()
                    .then(isWeb3Set => {
                        if (!isWeb3Set && pollCounter < POLL_MAX_COUNTER) {
                            setTimeout(poll, 500);
                        } else {
                            resolve();
                        }
                    }).catch((err) => {
                        reject(err);
                    });
            }
            poll();
        });
    }

    _getWeb3(updateAddress) {
        const component = this;
        return new Promise(function (resolve, reject) {
            component._pollWeb3()
                .then(() => {
                    const web3 = web3Service.getWeb3();
                    const address = web3.eth.accounts[0];
                    updateAddress(address);
                    return escrowContract.setup(web3Service.getWeb3());
                }).then(() => {
                    return escrowContract.getContractAddress();
                }).then((contractAddress) => {
                    resolve({ web3Loaded: true, noWeb3: false, contractAddress });
                }).catch(() => {
                    resolve({ web3Loaded: true, noWeb3: true });
                });
        });
        
    }

    componentWillMount() {
        this._getWeb3(this.props.updateAddress)
            .then((result) => {
                this.setState(result);
            });
        
    }

    render() {
        return (
            <div>
                <Web3StatusBar web3Loaded={this.state.web3Loaded} noWeb3={this.state.noWeb3} address={this.props.address} contractAddress={this.state.contractAddress} />
                <div className="container">
                    <Header />
                    <MainTab />
                    <Footer />
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        address: state.address
    }
}


export default connect(mapStateToProps, { updateAddress })(App);
