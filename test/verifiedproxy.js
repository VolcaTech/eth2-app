const VerifiedProxy = artifacts.require("./VerifiedProxy.sol"); 
const Promise = require('bluebird');

// for soliditySha3

Promise.promisifyAll(web3.eth, {suffix: "Promise"});
const oneEth = web3.toWei(1,  "ether");
const _commission = parseInt(web3.toWei(0.01,  "ether"));

// verification constatns
const verificationPublicKey = "0xD2657dBf4900A59e6125a83aA46388730a9f7753";
const verificationPrivateKey = "c1d65fc0afe6afe5318d400d93de5057c16f3e1b2715d5072f64cf4b1d4ab493";
const receiverAddress = "0x1b019c6f52c39e07e6c396ee1d0f957d3832d92a";
const sha3 = require('solidity-sha3').default;
const sha3withsize = require('solidity-sha3').sha3withsize;
const util = require("ethereumjs-util");

const Web3Utils = require('web3-utils');
var signature, v, r, s;
const PREFIX = "\x19Ethereum Signed Message:\n32";
var verificationHash = Web3Utils.soliditySha3(PREFIX, {type: 'address', value: receiverAddress});

const DEPOSIT_GAS_COST = 60000;
const GAS_PRICE = 20;


function sign(privateKey, msgHash) {
    //return util.ecsign(new Buffer(util.stripHexPrefix(msgHash), 'hex'), new Buffer(privateKey, 'hex'));
    return util.ecsign(new Buffer(util.stripHexPrefix(msgHash), 'hex'), new Buffer(privateKey, 'hex'));
}

signature = sign(verificationPrivateKey, verificationHash);

function generateTransferId() {
    const PHONE = "123456789";    
    return sha3(PHONE + Math.random().toString(32).slice(5).toUpperCase());
}

v = signature.v;
r =  '0x' + signature.r.toString("hex");
s =  '0x' + signature.s.toString("hex");	    
const sigParams = `"${receiverAddress}",${v},"${r}","${s}"`;

function parseTransfer(result) {
    return {
	id: result[0].toString(),
	status: result[1].toNumber(),
	from: result[2].toString('hex'),
	amount: result[3].toNumber()
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
   
    
    function sendTransfer(gasPrice) {
	if (!gasPrice) {
	    gasPrice = GAS_PRICE;
	}
	const transferId = generateTransferId();
	return verifiedproxyInstance.deposit(verificationPublicKey, transferId, {from: senderAddress, value: oneEth, gasPrice: gasPrice})
	    .then(function(txData) {
		return verifiedproxyInstance.getTransfer.call(transferId, {from: senderAddress})
		    .then(parseTransfer);
	    });
    }

    
    function initBalances() {
	verifierAddress = accounts[0];
	senderAddress = accounts[1];	
	web3.eth.getBalancePromise(senderAddress).then(function(result) {
	    initialBalances.sender = result;
	});
	web3.eth.getBalancePromise(verifiedproxyInstance.address).then(function(result) {
	    initialBalances.contract = result;		
	});
	web3.eth.getBalancePromise(verifierAddress).then(function(result) {
	    initialBalances.verifier = result;		
	});
	web3.eth.getBalancePromise(receiverAddress).then(function(result) {
	    initialBalances.receiver = result;		
	});	

    }
    
    before("deploy and prepare", function() {
	VerifiedProxy.deployed().then(function(instance) {
	    verifiedproxyInstance = instance;
	}).then(function() {
	    initBalances();
	});
    });

    it("it should have correct initial valus (commission)", function() {
	verifiedproxyInstance.commissionFee()
	.then(function(commission) {
	    assert.equal(commission.toString(), _commission, "it doesn't have correct commission");
	});

    });
    
    describe("Sender sends 1 ether directly to verifier contract (fallback function) ", function() {
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

    describe("#deposit", function() {
	beforeEach("making transfer", function() {
	    initBalances();
	});
	
    	it("contract receives ether", function(done) {
	    sendTransfer()
		.then(function() {
    		    return web3.eth.getBalancePromise(verifiedproxyInstance.address);})
		.then(function(contractBalanceAfterTx) {
		    assert.equal(oneEth.toString(), contractBalanceAfterTx.toString(), "ether was not received by contract");
		    done();
		}).catch(done);
	});

    	it(" commission is accrued for verifier", function(done) {
	    let commissionToWithdrawBefore;
	    verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress})
		.then(function(_commissionToWithdraw) {
		    commissionToWithdrawBefore = _commissionToWithdraw;
    		    return sendTransfer();
		}).then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdrawAfter) {
		    const gasCommission = GAS_PRICE * DEPOSIT_GAS_COST;
		    const transferCommission = _commission + gasCommission;
		    assert.equal((commissionToWithdrawBefore.plus(transferCommission)).toString(), _commissionToWithdrawAfter.toString(), "commission was not accrued");
		    done();
		}).catch(done);
	});

    	it(" commission is accrued correctly with different gas price", function(done) {
	    let commissionToWithdrawBefore;
	    const GAS_PRICE_2 = 2;
	    verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress})
		.then(function(_commissionToWithdraw) {
		    commissionToWithdrawBefore = _commissionToWithdraw;
    		    return sendTransfer(GAS_PRICE_2);
		}).then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdrawAfter) {
		    const gasCommission = GAS_PRICE_2 * DEPOSIT_GAS_COST;
		    const transferCommission = _commission + gasCommission;
		    assert.equal((commissionToWithdrawBefore.plus(transferCommission)).toString(), _commissionToWithdrawAfter.toString(), "commission was not accrued");
		    done();
		}).catch(done);
	});


	it(" msg.value should cover transfer commission", function(done) {
	    let commissionToWithdrawBefore;
	    const GAS_PRICE_LARGE = parseInt(web3.toWei(1, 'ether'));
	    verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress})
		.then(function(_commissionToWithdraw) {
		    commissionToWithdrawBefore = _commissionToWithdraw;
    		    return sendTransfer(GAS_PRICE_LARGE);
		}).catch(function() {
		    // pass error
		}).then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdrawAfter) {
		    const gasCommission = GAS_PRICE_LARGE * DEPOSIT_GAS_COST;
		    const transferCommission = _commission + gasCommission;
		    assert.equal(commissionToWithdrawBefore.toString(), _commissionToWithdrawAfter.toString(), "commission was accrued");
		    done();
		}).catch(done);
	});

	
	it(" verifier can withdraw commission", function(done) {	  
	    let commissionToWithdraw;
	    
	    sendTransfer()
		.then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdraw) {
		    commissionToWithdraw = _commissionToWithdraw;
		    return verifiedproxyInstance.withdrawCommission({}, {from: verifierAddress});
		}).then(function() {
		    return web3.eth.getBalancePromise(verifierAddress);
		// ability to withdraw check		    
		}).then(function(_verifierBalance) {
		    assert.isBelow( _verifierBalance.toString(), (initialBalances.verifier.plus(commissionToWithdraw)).toString(), "balance is updated with more wei than commission");		    
		    assert.isAbove( _verifierBalance.toString(), initialBalances.verifier.toString(), "commission was not withdrawn");
		})
	        // commission to withdraw reset check
		.then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdraw) {
		    assert.equal(_commissionToWithdraw.toNumber(), 0, "commission to withdraw was not reset");

		// double-spend attack check
		    return verifiedproxyInstance.withdrawCommission({}, {from: verifierAddress});
		}).then(function() {
		    return web3.eth.getBalancePromise(verifierAddress);
		}).then(function(_verifierBalance) {
		    assert.isBelow( _verifierBalance.toString(), (initialBalances.verifier.plus(commissionToWithdraw)).toString(), "commission was withdrawn twice");
		    done();
		}).catch(done);
	});

	it(" commission should go to verifier even if function called by other sender", function(done) {
	    let commissionToWithdraw, verifierBalanceBefore;
	    
	    sendTransfer()
		.then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdraw) {
		    commissionToWithdraw = _commissionToWithdraw;
		    return web3.eth.getBalancePromise(verifierAddress);
		}).then(function(_balance) {
		    verifierBalanceBefore = _balance;
		    // ability to withdraw check		    
		    return verifiedproxyInstance.withdrawCommission({}, {from: senderAddress});
		}).catch(function(err) {
		    // error pass
		}).then(function() {
		    return web3.eth.getBalancePromise(verifierAddress);
		// ability to withdraw check		    
		}).then(function(_verifierBalance) {
		    assert.equal( verifierBalanceBefore.plus(commissionToWithdraw).toNumber(), _verifierBalance.toNumber()," ether wasn't withdrawn to verifier");		    
		})
	        // commission to withdraw reset check
		.then(function() {
		    return verifiedproxyInstance.commissionToWithdraw.call({}, {from: verifierAddress});
		}).then(function(_commissionToWithdraw) {
		    assert.equal(_commissionToWithdraw.toNumber(), 0, "commission to withdraw wasn't reset");
		    done();
		}).catch(done);
	});



    });

    describe("signature verification", function() {

	it("can correctly recognize address for signature", function(done) {
	    verifiedproxyInstance.verifySignature.call(verificationPublicKey, receiverAddress, v, r, s, {from: verifierAddress})	    
		.then(function(result) {
		    assert.equal(result, true, "it didn't correctly recognized signature");
		    done();
		}).catch(done);
	});
	
	it("returns different address for antother receiver", function(done) {
	    verifiedproxyInstance.verifySignature.call(verificationPublicKey, senderAddress, v, r, s, {from: verifierAddress})
		.then(function(result) {
		    assert.equal(result, false, "it didn't correctly recognized signature");
		    done();
		}).catch(done);

	});
    });
    
    describe("pending transfer", function() {
	
    	it("can be fetched by sender", function(done) {
	    sendTransfer()
		.then(function(transfer) {
		    assert.equal(transfer.amount.toString(), "989999999998800000", "amount is correct.");
		    assert.equal(transfer.from, senderAddress, "sender is correct.");
		    assert.equal(transfer.status, 0, "status is correct.");		    		    		    
		    done();
		})
		.catch(done);	    
	});
	    
	
    	it("can be withdrawn with correct signature and through verifier", function(done) {
	    var transfer;
	    sendTransfer()
		.then(function(_transfer) {
		    transfer = _transfer;
		    return verifiedproxyInstance.withdraw(transfer.id, receiverAddress, v, r, s, {from: verifierAddress, gas: 3000000});
		}).then(function() {
		    return verifiedproxyInstance.getTransfer.call(transfer.id, {from: verifierAddress});
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
	    sendTransfer()
		.then(function(transfer) {
		    transferId = transfer.id;
		    return verifiedproxyInstance.withdraw(transfer.id, receiverAddress, v, r, s, {from: senderAddress, gas: 3000000});
		}).catch(function(err) {
		    // passing error from smart contract
		}).then(function() {
		    return verifiedproxyInstance.getTransfer.call(transferId,{from: senderAddress});
		}).then(parseTransfer).then(function(transfer) {
		    assert.equal(transfer.status, 0, "status is not updated to withdrawn.");		    		    		    
		    done();
		}).catch(done);
	});
	


	it("cannot be withdrawn through verifier without correct signature", function(done) {
	    var transfer;
	    sendTransfer()
		.then(function(_transfer) {
		    transfer = _transfer;
		    return verifiedproxyInstance.withdraw(transfer.id, senderAddress, v, r, s, {from: verifierAddress, gas: 3000000});
		}).catch(function() {
		    // passing error
		}).then(function() {
		    return verifiedproxyInstance.getTransfer.call(transfer.id, {from: verifierAddress});
		}).then(parseTransfer).then(function(_transfer) {
		    transfer = _transfer;
		    assert.equal(transfer.status, 0, "status is incorrectly updated to withdrawn 0.");
		    done();
		}).catch(done);
	});
	    

	it("can be cancelled by sender", function(done) {	    
	    sendTransfer()
		.then(function(transfer) {
		    return {tx: verifiedproxyInstance.cancelTransfer(transfer.id, {from: senderAddress, gas: 3000000}), transferId: transfer.id};
		}).then(function({tx, transferId}) {
		    return verifiedproxyInstance.getTransfer.call(transferId, {from: senderAddress});
		}).then(parseTransfer).then(function(transfer) {
		    assert.equal(transfer.status, 2, "status is updated to cancelled (2).");		    		    		    
		    done();
		}).catch(done);
	});

	it("cannot be canceled by verifier", function(done) {
	    var transferId;
	    sendTransfer()
		.then(function(transfer) {
		    transferId = transfer.id;
		    return verifiedproxyInstance.withdraw(transfer.id, {from: verifierAddress, gas: 3000000});
		}).catch(function(err) {
		    // passing error from smart contract
		}).then(function() {
		    return verifiedproxyInstance.getTransfer.call(transferId,{from: senderAddress});
		}).then(parseTransfer).then(function(transfer) {
		    assert.equal(transfer.status, 0, "status is updated to cancelled.");		    		    		    
		    done();
		}).catch(done);
	});

	    
    });
});
