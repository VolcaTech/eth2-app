const sha3 = require('solidity-sha3').default;
const util = require("ethereumjs-util");
const e2pEscrow = artifacts.require("./e2pEscrow.sol");
const ksHelper = require("../src/utils/keystoreHelper");

const KEYSTORE_DATA = '{"version":3,"id":"e4c4ad8a-0150-42b8-a7a5-31657f5fc8c9","address":"3de003e09e3d2d1f72b79c1c63a12266b97a490b","crypto":{"ciphertext":"fa7ad9ae8f696c250978418528a8b30f2e77f4d894c22827f2ac4d24d9dc60ce","cipherparams":{"iv":"a1a84c1105cb84f21ea96e854657a890"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"37da265d85a1fa549e2f58c40ec67e85bb43e83924a3db3c00d6dd855a12b06e","n":4,"r":8,"p":1},"mac":"0438559620b375685e75c87c918ae1e2e841af1eb0584cc840f478b0316abb45"}}';

const PASSWORD = "IS6F0I4O";
const PUBLIC_KEY = "0x3dE003E09e3d2D1F72B79c1c63a12266B97a490B";
const PRIVATE_KEY = "98f0468b85c22a6f071ae4f42cf386519b064ef3442e67278df3608d814bb38a";

const MSG = "0xF512AAdEb9cBA7946EFB28411AB5efc6FBE54283";

contract('e2pEscrow', function(accounts) {
    it("should generate correct private key", function() {
	assert.equal(ksHelper.getPrivateKey(KEYSTORE_DATA, PASSWORD).toString("hex"), PRIVATE_KEY , " private key decipher is not correct");
    });
    it("should have correct signature", function() {
	const hashedMsg = sha3(MSG);
	const sig = ksHelper.signWithPK(ksHelper.getPrivateKey(KEYSTORE_DATA, PASSWORD), hashedMsg);


	const pub = util.ecrecover(util.toBuffer(hashedMsg), sig.v, sig.r, sig.s);
	const adr = '0x' + util.pubToAddress(pub).toString('hex');
	
	assert.equal(adr.toLowerCase(),PUBLIC_KEY.toLowerCase() , " signed message is not correct");
    });
});
