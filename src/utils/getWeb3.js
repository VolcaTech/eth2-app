import Web3 from 'web3';

const getWeb3 = () => {    
    return new Promise((resolve, reject) => {
	// Wait for loading completion to avoid race conditions with web3 injection timing.
	window.addEventListener('load', function() {
	    var web3 = window.web3;	    
	    if (window.ethereum) { 
		window.ethereum.enable().then((result) => {
		    const provider = window.ethereum;
		    web3 = new Web3(provider);
		    resolve(web3);
		});
	    } else if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider.
		web3 = new Web3(web3.currentProvider);
		console.log('Injected web3 detected.');
		resolve(web3);
	    } else {
		console.log('No web3 instance injected.');
	  	resolve(web3);
	    }
	});
    });
}


export default getWeb3;
