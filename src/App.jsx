import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MainTab from './components/MainTab';

// import escrowContract from "./services/eth2phone/escrowContract";
import Web3StatusBar from './components/common/Web3StatusBar';
import SendTab from './components/SendTab/SendTab';
// import Footer from './components/common/LinkFooter';
// import Header from './components/common/Header';
// import { updateAddress } from './actions';


class App extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     web3Loaded: false,
    //     //     noWeb3: false,
    //     //     contractAddress: ""
    //     // };
    // }

    // _pollWeb3() {
    //     const component = this;

    //     return new Promise(function (resolve, reject) {
    //     });
    // }

    // _getWeb3(updateAddress) {
    //     const component = this;
    //     return new Promise(function (resolve, reject) {
    //         component._pollWeb3()
    //             .then(() => {
    //                 const web3 = web3Service.getWeb3();
    //                 const address = web3.eth.accounts[0];
    //                 updateAddress(address);
    //                 return escrowContract.setup(web3Service.getWeb3());
    //             }).then(() => {
    //                 return escrowContract.getContractAddress();
    //             }).then((contractAddress) => {
    //                 resolve({ web3Loaded: true, noWeb3: false, contractAddress });
    //             }).catch(() => {
    //                 resolve({ web3Loaded: true, noWeb3: true });
    //             });
    //     });

    // }

    // componentWillMount() {
    //     this._getWeb3(this.props.updateAddress)
    //         .then((result) => {
    //             this.setState(result);
    //         });
    // }

    render() {

        // <Header />
        // <MainTab />
        // <Footer />

        return (
            <div>
                <div className="container">
                    <Web3StatusBar web3Loaded={true} noWeb3={this.props.connected} address={this.props.address} contractAddress={this.props.contractAddress} />
                    <div>
                    <SendTab />
                </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log({ state });
    return {
        address: state.web3Data.address,
        contractAddress: state.web3Data.address,
        connected: state.web3Data.connected
    };
}


export default connect(mapStateToProps)(App);
