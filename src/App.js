import React, { Component } from 'react';

import MainTab from './components/MainTab';
import web3Api from "./utils/web3-common-api";

import Web3StatusBar from './components/common/Web3StatusBar';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
      	  web3Loaded: false,
      	  noWeb3: false
      };
  }

    _pollWeb3() {
	const component = this;
	return new Promise(function(resolve, reject) {
	    function poll() {
		console.log("trying web3...");		
		web3Api.setup() 
		    .then(isWeb3Set => {
		    if (!isWeb3Set) {
			console.log("web3 is not set", isWeb3Set);
			setTimeout(poll, 3000);
		    } else {
			console.log("web3 is set", isWeb3Set);			
			resolve();
		    }
		}).catch((err) => {
		    console.log('Error finding web3.', err);
		    reject(err);
		});
	    }
	    
	    poll();
	});
    }
    
    _getWeb3() {
	const component = this;
	return new Promise(function(resolve, reject) {
	    component._pollWeb3()
		.then(() => {
		    resolve({ web3Loaded: true,  noWeb3: false});
		}).catch(() => {
		    resolve({ web3Loaded: true,  noWeb3: true});
		});
	});
    }
    
    componentWillMount() {
	this._getWeb3()
	    .then(({ web3Loaded, noWeb3 }) => {
		this.setState({ web3Loaded, noWeb3 });
	    });
  }

    render(){
	//console.log({state: this.state})	
	return(
		<div>
		<Web3StatusBar web3Loaded={this.state.web3Loaded} noWeb3={this.state.noWeb3}/> 

	   <div className="wrapper">
		<div className="container-center animated slideInDown">
		  <MainTab/>
            </div>
		</div>
		</div>
	);
  }
}



export default App
