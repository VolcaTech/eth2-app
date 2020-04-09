// singleton - stores network info
const ServerUrlGetter = () => {
    let serverUrl = null;
    
    function setNetwork(networkId) {
	    switch (networkId) {
	    case '1':
	      serverUrl = 'https://mainnet-eth2.linkdrop.io';
	      break;
	    default:
	      serverUrl = null;
	    }  
    }

    function getServerUrl() {
	if (!serverUrl) {
	    throw new Error("Verification server url error");
	}
	return serverUrl;
    }

    // api
    return {
	setNetwork,
	getServerUrl
    };
}

export default ServerUrlGetter();
