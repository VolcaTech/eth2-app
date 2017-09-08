import React, { Component } from 'react';
import web3Api from "../..//utils/web3-common-api";

const ConnectionStatus = () => (
	<div>
	Web3 is connected: 
	<strong className="c-white"> 	
	{web3Api.isConnected() ? " connected" : " not connected" }
        </strong>
	</div>
)


const Balance = () => (
	<div>
	Balance: 
	<strong className="c-white"> {web3Api.getBalance()} ETH</strong>	
	</div>
)

const Network = () => (
	<div>
	Network: 
	<strong className="c-white"> {web3Api.getNetworkName()} ({web3Api.getNetworkId()}) </strong>	
	</div>
)



const Address = () => (
	<div>
	Address: 
	  <strong className="c-white"> {web3Api.getAddress()} </strong>	
	</div>
)


const Web3StatusContent = ({web3Loaded, noWeb3}) => {
    if (!web3Loaded) {
	return (
	    <div>
		Loading web3...;
	    </div>
	);
    }    
    if (noWeb3) {
	return (
	    <div>
		No web3 is connected!
	    </div>
	);
    }
    return (
	    <div>
	       <ConnectionStatus />
	       <Balance />
	       <Address />
	       <Network />
	</div>
    );
};


class Web3StatusBar extends React.Component {


    render() {
	//console.log(this.props);
	const props = this.props;
    return (

<div className="row m-t-sm">
    <div className="col-md-12">
	<div className="panel panel-filled">
	    <div className="panel-body"><div className="row">
		<div className="col-md-12">
		    <div className="media">
	                <Web3StatusContent {...props}/> 
		    </div>
		</div>
	    </div>
	</div>
    </div>
</div>
	
	    </div>
    );
}
}

export default Web3StatusBar;
