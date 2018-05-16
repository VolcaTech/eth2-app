const BRANCH_URL = 'https://api.branch.io';
const TRUST_BRANCH_KEY = "key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D";


const getDeepLinkForTrustWallet = (url) => {
    
    const data = {
	"branch_key": TRUST_BRANCH_KEY,
	"channel": "eth2phone",
	"campaign": "eth2phone",
	"data": {
	    "$og_title": "Eth2phone",
	    "$og_description": "Eth2phone - send ether to phone number",
	    "$desktop_url": "https://trustwalletapp.com/", 
	    "url": url,
	    "event": "openURL"
	}
    };
    
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
