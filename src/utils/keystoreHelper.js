const Wallet = require('ethereumjs-wallet');
const util = require("ethereumjs-util");


const ksHelper = {
    create: function(password) {
	const wallet = Wallet.generate();
	const address = wallet.getChecksumAddressString();
	const params = {
	    n:  4
	};

	const keystoreData = JSON.stringify(wallet.toV3(password, params));

	console.log("generated wallet data: ", keystoreData);
	return {"address": address, "keystoreData": keystoreData};
    },
    import: function(password, privateKey) {
	const wallet = Wallet.fromPrivateKey(new Buffer(privateKey, 'hex'));
	const address = wallet.getChecksumAddressString();
	const params = {
	    n:  4
	};

	const keystoreData = JSON.stringify(wallet.toV3(password, params));

	console.log("generated wallet data: ", keystoreData);
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
