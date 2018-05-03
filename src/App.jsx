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
        connected: state.web3Data.connected
    };
}


export default connect(mapStateToProps)(App);
