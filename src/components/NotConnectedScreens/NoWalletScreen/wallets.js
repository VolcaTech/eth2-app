const _withoutProtocol = (url) => {
    return url.replace(/(^\w+:|^)\/\//, '');
}


export default {
    trust: {
        id: 'trust',	
	name: 'Trust',
        walletURL: "https://trustwalletapp.com",
	mobile: {
	    android: {
		support: true,
		deepLink: (url) =>  `https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=${encodeURIComponent(url)}`
	    },
	    ios: {
		support: true,
		deepLink: (url) =>  `https://links.trustwalletapp.com/a/key_live_lfvIpVeI9TFWxPCqwU8rZnogFqhnzs4D?&event=openURL&url=${encodeURIComponent(url)}`
	    }
	}
    },    
    opera_beta: {
	id: 'opera_beta',
	name: 'Opera Beta',
        walletURL: "https://www.opera.com/download",
	mobile: {
	    android: {
		support: true,
		deepLink: (url) =>  `intent://${_withoutProtocol(url)}/#Intent;scheme=http;package=com.opera.browser.beta;end`
	    },
	    ios: {
		support: false,
		deepLink: null
	    }
	}	
    },
    status: {
	id: 'status',
	name: 'Status',
        walletURL: "https://status.im/",
	mobile: {
	    android: {
		support: true,
		deepLink: url => `https://get.status.im/browse/${_withoutProtocol(url)}`
	    },
	    ios: {
		support: true,
		deepLink: url => `https://get.status.im/browse/${_withoutProtocol(url)}`
	    }
	}			
    },    
    token_pocket: {
	id: 'token_pocket',	
	name: "Token Pocket",
        walletURL: "https://tokenpocket.jp/index_en.html",
	mobile: {
	    android: {
		support: false,
		deepLink: null
	    },
	    ios: {
		support: true,
		deepLink: (url) =>  `https://tokenpocket.github.io/applink?dappUrl=${encodeURIComponent(url)}`
	    }
	}	
    },
    coinbase_wallet: {
	id: 'coinbase_wallet',	
        name: "Coinbase Wallet",
        walletURL: "https://www.toshi.org",
	mobile: {
	    android: {
		support: true,
		deepLink: null
	    },
	    ios: {
		support: true,
		deepLink: null
	    }
	}		
    },
    cipher: {
	id: 'cipher',	
        name: "Cipher Browser",
        walletURL: "https://www.cipherbrowser.com",
	mobile: {
	    android: {
		support: true,
		deepLink: null
	    },
	    ios: {
		support: true,
		deepLink: null
	    }
	}		
    },
  
}
