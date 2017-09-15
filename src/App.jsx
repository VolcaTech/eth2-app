import React, { Component } from 'react';

import MainTab from './components/MainTab';
import web3Api from "./apis/web3-common-api";
import verifiedProxyContractApi from "./apis/verified-proxy-contract-api";
import Web3StatusBar from './components/common/Web3StatusBar';
import LinkFooter from './components/common/LinkFooter';


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
		return new Promise(function (resolve, reject) {
		    function poll() {
			console.log("trying web3...");
			web3Api.setup()
			    .then(isWeb3Set => {
				if (!isWeb3Set) {
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

	_getWeb3() {
		const component = this;
		return new Promise(function (resolve, reject) {
		    component._pollWeb3()
			.then(() =>{
			    return verifiedProxyContractApi.setup(web3Api.getWeb3());								    
			}).then(() => {
			    return verifiedProxyContractApi.getContractAddress();
			}).then((contractAddress) => {
			    resolve({ web3Loaded: true, noWeb3: false, contractAddress});
			}).catch(() => {
			    resolve({ web3Loaded: true, noWeb3: true });
			});
		});
	}

	componentWillMount() {
		this._getWeb3()
		.then((result) => {
		    this.setState(result);
		});
	}

	render() {
		//console.log({state: this.state})	
		return (
			<div>
			<Web3StatusBar web3Loaded={this.state.web3Loaded} noWeb3={this.state.noWeb3} contractAddress={this.state.contractAddress} />
				<div className="row" style={{ textAlign: "center", marginBottom: "15px" }}>

					<h3>Send ether to any person by phone number.<br />Simple. Secure. No wallet needed.</h3>
				</div>
				<div className="wrapper">
					<div className="container-center animated slideInDown">
						<MainTab />
					</div>
				</div>
				<LinkFooter />
			</div>
		);
	}
}



export default App
