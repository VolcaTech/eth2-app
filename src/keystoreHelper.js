import EthTx from 'ethereumjs-tx';
const Wallet = require('ethereumjs-wallet');
const util = require("ethereumjs-util");

function sign(privateKey, msgHash) {
    const signature = util.ecsign(new Buffer(util.stripHexPrefix(msgHash), 'hex'), new Buffer(privateKey, 'hex'));
    return signature;
}


export default {
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
	const wallet =   Wallet.fromPrivateKey(new Buffer(privateKey, 'hex'));
	const address = wallet.getChecksumAddressString();
	const params = {
	    n:  4
	};

	const keystoreData = JSON.stringify(wallet.toV3(password, params));

	console.log("generated wallet data: ", keystoreData);
	return {"address": address, "keystoreData": keystoreData};
    },
    signTx: function(keystoreData, password, msg) {
	//console.log(keystoreData, password);
	let privateKey = Wallet.fromV3(keystoreData, password).getPrivateKey();

	 return sign(privateKey, msg.toString("hex"));
    },

}

