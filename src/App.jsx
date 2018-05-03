import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import web3Service from './services/web3Service';
import SendTab from './components/SendTab/SendTab';
import ReceiveForm from './components/Receive/ReceiveForm';
import PendingTransferComponent from './components/PendingTransfer/PendingTransfer';
import Header from './components/common/Header.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


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
		<div>
		  Web3 is not connected. Please use Trust Browser in order to send and receive ether.
		</div>
	    );
	}

	if (this.props.networkId != "3") {
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
		<Header address={this.props.address} balance={this.props.balance} /> 
		<Switch>
                  <Route exact path="/" component={SendTab} />
                  <Route exact path="/transfers/:transferId" component={PendingTransferComponent}/>
		  <Route exact path="/receive" component={ReceiveForm} />	    
		</Switch>
	      </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    let balance = null;
    const web3 = web3Service.getWeb3();
    if (state.web3Data.balance) {
	balance = web3.fromWei(state.web3Data.balance, 'ether').toNumber();
	balance = balance.toFixed(4);
    }
    return {
        address: state.web3Data.address,
        contractAddress: state.web3Data.address,
	balance,
        connected: state.web3Data.connected,
	networkId: state.web3Data.networkId,
	networkName: state.web3Data.networkName,
	loaded: state.web3Data.loaded
    };
}


export default connect(mapStateToProps)(App);
