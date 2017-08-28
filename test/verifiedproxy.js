var VerifiedProxy = artifacts.require("./VerifiedProxy.sol");
var Promise = require('bluebird');

Promise.promisifyAll(web3.eth, {suffix: "Promise"});
var oneEth = web3.toWei(1,  "ether");
var _commission = web3.toWei(0.01,  "ether");

// verification constatns
var verificationPublicKey = "0xD2657dBf4900A59e6125a83aA46388730a9f7753";
var verificationPrivateKey = "c1d65fc0afe6afe5318d400d93de5057c16f3e1b2715d5072f64cf4b1d4ab493";
var receiverAddress = "0x1b019c6f52c39e07e6c396ee1d0f957d3832d92a";
const sha3 = require('solidity-sha3').default;
const util = require("ethereumjs-util");

var signature, v, r, s;
var verificationHash = sha3(receiverAddress);

function sign(privateKey, msgHash) {
    const signature = util.ecsign(new Buffer(util.stripHexPrefix(msgHash), 'hex'), new Buffer(privateKey, 'hex'));
    return signature;
}

signature = sign(verificationPrivateKey, verificationHash.toString("hex"));
console.log("signature: ", signature);
v = signature.v;
r =  '0x' + signature.r.toString("hex");
s =  '0x' + signature.s.toString("hex");	    



function parseTransfer(result) {
    return {
	id: result[0].toNumber(),
	status: result[1].toNumber(),
	from: result[2].toString('hex'),
	amount: result[3].toNumber(),
	blocknumber: result[4].toNumber()	
    };
}

contract('VerifiedProxy', function(accounts) {
    var senderAddress,
	verifierAddress,
	initialBalances = {
	    sender: 0,
	    contract: 0,
	    verifier: 0,
	    reciever: 0
	},
	 verifiedproxyInstance;


    function initBalances() {
	//console.log("initing balances");
	senderAddress = accounts[1];
	verifierAddress = accounts[3];
	web3.eth.getBalancePromise(senderAddress).then(function(result) {
	    ////console.log("got sender balance: ", result.toString());
	    initialBalances.sender = result;
	});
	web3.eth.getBalancePromise(verifiedproxyInstance.address).then(function(result) {
	    ////console.log("got contract's balance: ", result.toString());
	    initialBalances.contract = result;		
	});
	web3.eth.getBalancePromise(verifierAddress).then(function(result) {
	    ////console.log("got contract's balance: ", result.toString());
	    initialBalances.verifier = result;		
	});
	web3.eth.getBalancePromise(receiverAddress).then(function(result) {
	    ////console.log("got contract's balance: ", result.toString());
	    initialBalances.receiver = result;		
	});	

    }
    
    before("deploy and prepare", function() {
	//console.log("in describe before each..");
	VerifiedProxy.deployed().then(function(instance) {
	    //console.log("instance deployed: ");
	    verifiedproxyInstance = instance;
	}).then(function() {
	    initBalances();
	});
    });

    it("it should have correct initial valus (verifier, commission)", function() {
	verifiedproxyInstance.verifier().then(function(verifier) {
	    assert.equal(verifier, verifierAddress, "it doesn't have correct verifier address");
	    return verifiedproxyInstance.commission();
	}).then(function(commission) {
	    assert.equal(commission, _commission, "it doesn't have correct commission");
	});

    });
    
    describe("Sender sends 1 ether to verifier contract ", function() {
	beforeEach("init values", function() {
	    initBalances();
	});

	it("contract should not accept ether to address", function() {
	    web3.eth.sendTransactionPromise({to: verifiedproxyInstance.address, from: senderAddress, value: oneEth}).catch(function() {
		    // passing error
		})
		.then(function(result) {
		    return web3.eth.getBalancePromise(verifiedproxyInstance.address);
		})
		.then(function(contractBalanceAfterTx) {
		    assert.equal(initialBalances.contract.toString(), contractBalanceAfterTx.toString(), "Ether was incorrectly received by contract");
		});
	});
    });

    describe("ether transfer", function() {
	beforeEach("making transfer", function() {
	    //console.log("before maiking transfer");
	    initBalances();
	});
	
    	it(" is correct for contract", function(done) {
	    verifiedproxyInstance.deposit(verificationPublicKey, {from: senderAddress, value: oneEth})	    
		.then(function(txId) {
    		    return web3.eth.getBalancePromise(verifiedproxyInstance.address)})

	    
		.then(function(contractBalanceAfterTx) {
		    assert.equal((initialBalances.contract.plus(oneEth).minus(_commission)).toString(), contractBalanceAfterTx.toString(), "1 ether (minus fee) was not received by contract");
		    done()
		}).catch(done);
	});

    	it(" is correct for verifier", function(done) {
	    verifiedproxyInstance.deposit(verificationPublicKey, {from: senderAddress, value: oneEth})	    
		.then(function(txId) {
    		    return web3.eth.getBalancePromise(verifierAddress);})
		.then(function(verifierBalanceAfterTx) {
		    assert.equal((initialBalances.verifier.plus(_commission)).toString(), verifierBalanceAfterTx.toString(), "verifier hasn't received commission");
		    done();
		}).catch(done);
	});
    });

    describe("signature verification", function() {

	it("can correctly recognize address for signature", function(done) {	    
	    verifiedproxyInstance.verifySignature.call(receiverAddress, v, r, s, {from: verifierAddress})
		.then(function(result) {
		    assert.equal(result.toLowerCase(), verificationPublicKey.toLowerCase(), "it didn't correctly recognized signature");
		    done();
		}).catch(done);
	});
	
	it("returns different address for antother receiver", function(done) {
	    verifiedproxyInstance.verifySignature.call(senderAddress, v, r, s, {from: verifierAddress})
		.then(function(result) {
		    assert.notEqual(result.toLowerCase(), verificationPublicKey.toLowerCase(), "it didn't correctly recognized signature");
		    done();
		}).catch(done);

	});
    });
    
    describe("pending transfer", function() {
	var beforeSentCount = 0;

	function makeTransfer() {
	    return verifiedproxyInstance.getSentTransfersCount.call({from: senderAddress})
		.then(function(count) {
		    beforeSentCount = count.toNumber();
		}).then(function() {
		    return verifiedproxyInstance.deposit(verificationPublicKey, {from: senderAddress, value: oneEth});
		}).catch(function(err) {

		});
	}
	
	function getSentTransfer() {
	    return makeTransfer().then(function() {
		return verifiedproxyInstance.getSentTransfersCount.call({from: senderAddress})
	    	.then(function(count) { return count.toNumber();})
		    .then(function(transferCount) {
			return verifiedproxyInstance.getSentTransfer.call((transferCount-1),{from: senderAddress});
		    })
		    .then(parseTransfer);
	    });
	}

	function getTransferByPubKey() {
	    return makeTransfer().then(function() {
		return verifiedproxyInstance.getTransferByPubKey.call(verificationPublicKey,{from: verifierAddress})	    
	    }).then(parseTransfer);
	}

	
    	it("can be fetched by sender", function(done) {
	    getSentTransfer()
		.then(function(transfer) {
		    //assert.equal(transfer.id, beforeSentCount+1, "count is correct.");
		    assert.equal(transfer.amount.toString(), "990000000000000000", "amount is correct.");
		    assert.equal(transfer.from, senderAddress, "sender is correct.");
		    assert.equal(transfer.status, 0, "status is correct.");		    		    		    
		    done();
		})
		.catch(done);	    
	});
	    
	it("can be fetched by pub key", function(done) {
	    getTransferByPubKey()
		.then(function(transfer) {
			//assert.equal(transfer.id, beforeIncomingCount+1, "count is correct.");
			assert.equal(transfer.amount.toString(), "990000000000000000", "amount is correct.");
			assert.equal(transfer.from, senderAddress, "sender is correct.");
			assert.equal(transfer.status, 0, "status is correct.");		    		    		    
			done();
		    })
		    .catch(done);	    
	    });

	
    	it("can be withdrawn with correct signature and through verifier", function(done) {
	    var transfer;
	    getTransferByPubKey()
		.then(function(_transfer) {
		    transfer = _transfer;
		    return verifiedproxyInstance.withdraw(verificationPublicKey, receiverAddress, v, r, s, {from: verifierAddress, gas: 3000000});
		}).then(function() {
		    return verifiedproxyInstance.getTransferByPubKey.call(verificationPublicKey, {from: verifierAddress});
		}).then(parseTransfer).then(function(_transfer) {
		    transfer = _transfer;
		    assert.equal(transfer.status, 1, "status is updated to withdrawn (1).");
		    return web3.eth.getBalancePromise(receiverAddress);
		}).then(function(balance) {
		    assert.equal(web3.toBigNumber(balance).toString(), (web3.toBigNumber(transfer.amount).plus(web3.toBigNumber(initialBalances.receiver)).toString()), " ether not transfered to receiver");
		    done();
		}).catch(done);
	});
    
	it("cannot be withdrawn with correct signature but not through verifier", function(done) {
	    var transferId;
	    getSentTransfer()
		.then(function(transfer) {
		    ////console.log("transfer id: ", transfer);
		    transferId = transfer.id;
		    return verifiedproxyInstance.withdraw(verificationPublicKey, receiverAddress, v, r, s, {from: senderAddress, gas: 3000000});
		}).catch(function(err) {
		    // passing error from smart contract
		}).then(function() {
		    //console.log("tId: :", transferId);
		    return verifiedproxyInstance.getTransfer.call(transferId,{from: senderAddress});
		}).then(parseTransfer).then(function(transfer) {
		    //console.log("checking statas");
		    assert.equal(transfer.status, 0, "status is not updated to withdrawn.");		    		    		    
		    done();
		}).catch(done);
	});
	


	it("cannot be withdrawn through verifier without correct signature", function(done) {
	    var transfer;
	    getTransferByPubKey()
		.then(function(_transfer) {
		    transfer = _transfer;
		    return verifiedproxyInstance.withdraw(verificationPublicKey, senderAddress, v, r, s, {from: verifierAddress, gas: 3000000});
		}).catch(function() {
		    // passing error
		}).then(function() {
		    return verifiedproxyInstance.getTransferByPubKey.call(verificationPublicKey, {from: verifierAddress});
		}).then(parseTransfer).then(function(_transfer) {
		    transfer = _transfer;
		    assert.equal(transfer.status, 0, "status is incorrectly updated to withdrawn 0.");
		    done();
		}).catch(done);
	});
	    

	it("can be canceled by sender", function(done) {	    
	    getSentTransfer()
		.then(function(transfer) {
		    //console.log("transfer id: ", transfer);
		    return {tx: verifiedproxyInstance.cancelTransfer(transfer.id, {from: senderAddress, gas: 3000000}), transferId: transfer.id};
		}).then(function({tx, transferId}) {
		    //console.log(transferId);
		    return verifiedproxyInstance.getTransfer.call(transferId, {from: senderAddress});
		}).then(parseTransfer).then(function(transfer) {
		    assert.equal(transfer.status, 2, "status is updated to cancelled (2).");		    		    		    
		    done();
		}).catch(done);
	});

	it("cannot be canceled by verifier", function(done) {
	    var transferId;
	    getTransferByPubKey()
		.then(function(transfer) {
		    ////console.log("transfer id: ", transfer);
		    transferId = transfer.id;
		    return verifiedproxyInstance.withdraw(transfer.id, {from: verifierAddress, gas: 3000000});
		}).catch(function(err) {
		    // passing error from smart contract
		}).then(function() {
		    //console.log("tId: :", transferId);
		    return verifiedproxyInstance.getTransfer.call(transferId,{from: senderAddress});
		}).then(parseTransfer).then(function(transfer) {
		    //console.log("checking statas");
		    assert.equal(transfer.status, 0, "status is updated to cancelled.");		    		    		    
		    done();
		}).catch(done);
	});

	    
    });
});
