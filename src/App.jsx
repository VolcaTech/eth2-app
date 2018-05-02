import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3StatusBar from './components/common/Web3StatusBar';
import SendTab from './components/SendTab/SendTab';
import Header from './components/common/Header.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <div>
                        {this.props.address ? <Header address={this.props.address} /> : <Header />}
                        <Switch>
                            <Route exact path="/" component={SendTab} />
                            <Route exact path="/transaction" render={() => (
                                <div>new</div>)} />
                        </Switch>
                    </div>
                </div>
            </Router>
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
