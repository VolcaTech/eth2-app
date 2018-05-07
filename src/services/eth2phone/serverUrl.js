// singleton - stores network info
const ServerUrlGetter = () => {
    let serverUrl = null;
    
    function setNetwork(networkId) {
	switch (networkId) {
	case '1':
	    serverUrl = 'http://mainnet.eth2phone.com:8001';
	    break;
	case '3':
	    serverUrl = 'http://ropsten.eth2phone.com';
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
