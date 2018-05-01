import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import SendTab from './components/SendTab/SendTab';
import Header from './components/common/Header.jsx';


class App extends Component {

    render() {
        return (
            <div>
                <div>
                    {this.props.address ? <Header address={this.props.address}/> : <Header/>}
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
