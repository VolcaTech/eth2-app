import Web3 from 'web3';

const getWeb3 = () => {    
    return new Promise((resolve, reject) => {
	// Wait for loading completion to avoid race conditions with web3 injection timing.
	window.addEventListener('load', function() {
	    var web3 = window.web3;
	    
	    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
	    if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider.
		const provider = window.ethereum || web3.currentProvider;
		web3 = new Web3(provider);
		console.log('Injected web3 detected.');
	    } else {
		console.log('No web3 instance injected.');	  	    
	    }
	    
	    // ask Metamask to provide account info
	    if (window.ethereum && !web3.eth.accounts[0]) {
		window.ethereum.enable().then((result) => {
		    resolve(web3);
		});
	    } else {
		resolve(web3);
	    }
	});
    });
}


export default getWeb3;
