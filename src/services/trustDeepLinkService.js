const BRANCH_URL = 'https://api.branch.io';
const TRUST_BRANCH_KEY = "key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D";
//const ETH2PHONE_HOST = 'https://eth2phone.github.io';

const getDeepLinkForTrustWallet = (url) => {
    // data sent to server
    // const phoneNumberWithoutPlus = phone.substring(1); // remove '+' from number
    // let url = `${ETH2PHONE_HOST}/#/receive?code=${secretCode}&phone=${phoneNumberWithoutPlus}`;
    
    // // add chain id to url params if not mainnet
    // if (chainId != "1") {
    // 	url += `&chainId=${chainId}`;
    // }
    
    const data = {
	"branch_key": TRUST_BRANCH_KEY,
	"channel": "eth2phone",
	"campaign": "eth2phone",
	"data": {
	    "$og_title": "Eth2phone",
	    "$og_description": "Description for eth2phone",
	    // "$og_image_url": "http://www.lorempixel.com/400/400/",
	    "$desktop_url": url, 
	    "url": url,
	    "event": "openURL"
	}
    }
    
    return fetch(`${BRANCH_URL}/v1/url`, { 
        method: 'POST', 
        headers: {
	    'Accept': 'application/json',
      	    'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)	
    }).then((response)  => response.json());
}


export default getDeepLinkForTrustWallet;
