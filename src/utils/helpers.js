export function getQueryParams(search) {
    var key = false, res = {}, itm = null;
    // get the query string without the ?
    var qs = search.substring(1);

    // check for the key as an argument
    if (arguments.length > 0 && arguments[0].length > 1)
	key = arguments[0];
    // make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;
    // loop the items in the query string, either
    // find a match to the argument, or build an object
    // with key/value pairs
    while (itm = pattern.exec(qs)) {
	if (key !== false && decodeURIComponent(itm[1]) === key)
	    return decodeURIComponent(itm[2]);
	else if (key === false)
	    res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
    }

    return key === false ? res : null;
}

export function getNetworkNameById(networkId) {
   let networkName;
    switch (networkId) {
    case "1":
	networkName = "Main";
	break;
    case "2":
	networkName = "Morden";
	break;
    case "3":
	networkName = "Ropsten";
	break;
    case "4":
	networkName = "Rinkeby";
	break;
    case "42":
	networkName = "Kovan";
	break;
    default:
	networkName = `Unknown network`;
    }
    return networkName;
}

export function detectNetwork(web3) {
    let networkId;
    try {
	networkId = web3 && web3.version && web3.version.network;
    } catch (err) {
	console.log("error: ", err);
	networkId = -1;
    }
    const networkName = getNetworkNameById(networkId);
    return { networkName, networkId };
}



export function getDeviceOS() {
    if (/Android/i.test(navigator.userAgent)) {
	return 'android';
    }
    
    if ( /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
	return 'ios';
    }
    
    return 'other';
}


export function getCurrentWalletId(web3) {
    var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    if (isOpera) {
	return 'opera_beta';
    }

    if  (web3.currentProvider.isTrust) {
	return 'trust';
    }
    
    if  (web3.currentProvider.isTokenPocket) {
	return 'token_pocket';
    }
    
    if  (web3.currentProvider.isStatus) {
	return 'status';
    }
    
    return 'other';
}


