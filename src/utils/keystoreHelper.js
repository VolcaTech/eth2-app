const Wallet = require('ethereumjs-wallet');
const util = require("ethereumjs-util");


const ksHelper = {
    create: function(password) {
	const wallet = Wallet.generate();
	const address = wallet.getChecksumAddressString();
	const params = {
	    n:  4096,
	    p: 6,
	    r: 8
	};

	const keystoreData = JSON.stringify(wallet.toV3(password, params));
	return {"address": address, "keystoreData": keystoreData};
    },
    signTx: function(keystoreData, password, msg) {
	const signature = ksHelper.signWithPK(
	    ksHelper.getPrivateKey(keystoreData, password) // privateKey
	    , msg.toString("hex"));
	return signature;
    },
    getPrivateKey: function(keystoreData, password) {
	return Wallet.fromV3(keystoreData, password).getPrivateKey();
    },
    signWithPK: function (privateKey, msg) {
	return util.ecsign(new Buffer(util.stripHexPrefix(msg), 'hex'), new Buffer(privateKey, 'hex'));
    }
};


module.exports = ksHelper;
