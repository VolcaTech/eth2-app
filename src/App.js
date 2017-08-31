import React, { Component } from 'react';
// import './css/oswald.css';
// import './css/open-sans.css';
// import './css/pure-min.css';

//import getWeb3 from './utils/getWeb3';
//import MainTxab from './components/MainTab';
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

  componentDidMount() {
      web3Api.setup() 
	  .then(web3Loaded => {
	      this.setState({ web3Loaded, noWeb3: false });
	      console.log("set web3");
	  })
	  .catch((err) => {
	      console.log('Error finding web3.', err);
	      this.setState({ web3Loaded: true,  noWeb3: true});
	  });
  }


    render(){
	return(
		<div>
		<Web3StatusBar web3Loaded={this.state.web3Loaded} noWeb3={this.state.noWeb3}/> 

	   <div className="wrapper">
		<div className="container-center animated slideInDown">
            </div>
		</div>
		</div>
	);
  }
}

//            <MainTab/>

export default App
