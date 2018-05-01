import React, { Component } from 'react';

// {web3Service.isConnected() ? " connected" : " not connected" }
const ConnectionStatus = () => (
    <div>
      Web3 is: 
      <strong className="c-white"> 	
	
      </strong>
    </div>
)


const Balance = () => (
    <div>
      Balance: 
      <strong className="c-white"> 0 ETH</strong>	
    </div>
)

const Network = () => (
    <div>
      Network: 
    </div>
)



const Address = ({address}) => (
    <div>
      Address: 
      <strong className="c-white"> {address} </strong>	
    </div>
)

const ContractAddress = ({address}) => {
    const ropstenLink = `https://ropsten.etherscan.io/address/${address}`;
    return (
	<div>
	  Contract Address:  
	  <strong className="c-white">
	    <a target="_blank" href={ropstenLink} style={{color: '#ccc', textDecoration: "underline"}}>{address}</a>
	  </strong>	
	</div>
    );
}

const Web3StatusContent = ({web3Loaded, noWeb3, address, contractAddress}) => {
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
	      You're not connected to Ropsten Network.
	    </div>
	);
    }
    return (
	<div>
	  <ConnectionStatus />
	  <Balance />
	  <Address address={address}/>
	  <ContractAddress address={contractAddress} />

	  <Network />
	</div>
    );
};


function Web3StatusBar(props) {
    return (
	<div className="m-t-sm">
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


export default Web3StatusBar;
