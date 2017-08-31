var DirectProxy = artifacts.require("./DirectProxy.sol");
var Promise = require('bluebird');

Promise.promisifyAll(web3.eth, {suffix: "Promise"});
var oneEth = web3.toWei(1,  "ether");

function parseTransfer(result) {
    return {
	id: result[0].toNumber(),
	status: result[1].toNumber(),
	from: result[2].toString('hex'),
	to: result[3].toString('hex'),
	amount: result[4].toNumber(),
	blocknumber: result[5].toNumber()
    };
}

contract('DirectProxy', function(accounts) {
    var aliceAddress,
	bobAddress,
	initialBalances = {
	    Bob: 0,
	    Alice: 0,
	    contract: 0
	},
	 directProxyInstance;


    function initBalances() {
	//console.log("initing balances");
	aliceAddress = accounts[0];
	bobAddress = accounts[1];
	web3.eth.getBalancePromise(aliceAddress).then(function(result) {
	    ////console.log("got alice balance: ", result.toString());
	    initialBalances.alice = result;
	});
	web3.eth.getBalancePromise(bobAddress).then(function(result) {
	    ////console.log("got Bob's balance: ", result.toString());
	    initialBalances.bob = result;
	});
	web3.eth.getBalancePromise(directProxyInstance.address).then(function(result) {
	    ////console.log("got contract's balance: ", result.toString());
	    initialBalances.contract = result;		
	});
    }
    
    before("deploy and prepare", function() {
	//console.log("in describe before each..");
	DirectProxy.deployed().then(function(instance) {
	    //console.log("instance deployed: ");
	    directProxyInstance = instance;
	}).then(function() {
	    initBalances();
	});
    });

    describe("Alice sends 1 ether to contract directly", function() {
	beforeEach("init values", function() {
	    initBalances();
	});

	xit("contract should not accept ether to address", function() {
	    web3.eth.sendTransactionPromise({to: directProxyInstance.address, from: aliceAddress, value: oneEth}).catch(function() {
		    // passing error
		})
		.then(function(result) {
		    return web3.eth.getBalancePromise(directProxyInstance.address);
		})
		.then(function(contractBalanceAfterTx) {
		    assert.equal(initialBalances.contract.toString(), contractBalanceAfterTx.toString(), "Ether was incorrectly received by contract");
		});
	});
    });

    describe("Alice sends 1 ether to Bob via Direct Proxy", function() {
	beforeEach("making transfer", function() {
	    //console.log("before maiking transfer");
	    initBalances();
	});
	
    	xit("ether is correctly transfered to smart contract", function(done) {
	    directProxyInstance.deposit(bobAddress, {from: aliceAddress, value: oneEth})	    
		.then(function(txId) {
    		    return web3.eth.getBalancePromise(directProxyInstance.address)})
		.then(function(contractBalanceAfterTx) {
		    assert.equal((initialBalances.contract.plus(oneEth)).toString(), contractBalanceAfterTx.toString(), "1 ether was not received by contract");
		    return web3.eth.getBalancePromise(aliceAddress);
		}).then(function(aliceBalanceAfterTx) {
	            assert.isBelow(aliceBalanceAfterTx.toString(), (initialBalances.alice.minus(oneEth)).toString() , "1 ether was not send by contract");
		    //console.log("ok");
		    done()
		})
		.catch(done);
	});

    });

    describe("pending transfer", function() {
	var beforeSentCount = 0;
	var beforeIncomingCount = 0;
	function makeTransfer() {
	    return directProxyInstance.getIncomingTransfersCount.call({from: bobAddress}).then(function(count) {
		beforeIncomingCount = count.toNumber();
	    }).then(function() {
		return directProxyInstance.getSentTransfersCount.call({from: aliceAddress});
	    }).then(function(count) {
		beforeSentCount = count.toNumber();
	    }).then(function() {
		return directProxyInstance.deposit(bobAddress, {from: aliceAddress, value: oneEth});
	    }).catch(function(err) {
		//console.log(err);
	    });
	}
	
	function getSentTransfer() {
	    return makeTransfer().then(function() {
		return directProxyInstance.getSentTransfersCount.call({from: aliceAddress})
	    	.then(function(count) { return count.toNumber();})
		    .then(function(transferCount) {
			return directProxyInstance.getSentTransfer.call((transferCount-1),{from: aliceAddress});
		    })
		    .then(parseTransfer);
	    });
	}
				       
	function getIncomingTransfer() {
	    return makeTransfer().then(function() {
		return directProxyInstance.getIncomingTransfersCount.call({from: bobAddress})	    
		.then(function(count) { return count.toNumber();
		}).then(function(transferCount) {
		    return directProxyInstance.getIncomingTransfer.call((transferCount-1),{from: bobAddress});
		})
		    .then(parseTransfer);
	    });
	}
	
    	xit("can be fetched by sender", function(done) {
	    getSentTransfer()
		.then(function(transfer) {
		    assert.equal(transfer.id, beforeSentCount+1, "count is correct.");
		    assert.equal(transfer.amount, 1000000000000000000, "amount is correct.");
		    assert.equal(transfer.from, aliceAddress, "sender is correct.");
		    assert.equal(transfer.to, bobAddress, "receiver is correct.");
		    assert.equal(transfer.status, 0, "status is correct.");		    		    		    
		    done();
		})
		.catch(done);	    
	});
	    
	    xit("can be fetched by receiver", function(done) {
		getIncomingTransfer()
		    .then(function(transfer) {
			assert.equal(transfer.id, beforeIncomingCount+1, "count is correct.");
			assert.equal(transfer.amount, 1000000000000000000, "amount is correct.");
			assert.equal(transfer.from, aliceAddress, "sender is correct.");
			assert.equal(transfer.to, bobAddress, "receiver is correct.");
			assert.equal(transfer.status, 0, "status is correct.");		    		    		    
			done();
		    })
		    .catch(done);	    
	    });
	
    	it("can be withdrawn by receiver", function(done) {
	    getIncomingTransfer()
		.then(function(transfer) {
		    //console.log("transfer id: ", transfer);
		    return {tx: directProxyInstance.withdraw(transfer.id, {from: bobAddress, gas: 1000000}), transferId: transfer.id};
		}).then(function({tx, transferId}) {
		    //console.log(transferId);
		    return directProxyInstance.getTransfer.call(transferId, {from: bobAddress});
		}).then(parseTransfer).then(function(transfer) {
		    assert.equal(transfer.status, 1, "status is updated to withdrawn (1).");		    		    		    
		    done();
		}).catch(done);
	});
    
	xit("cannot be withdrawn by sender", function(done) {
	    var transferId;
	    getSentTransfer()
		.then(function(transfer) {
		    ////console.log("transfer id: ", transfer);
		    transferId = transfer.id;
		    return directProxyInstance.withdraw(transfer.id, {from: aliceAddress, gas: 3000000});
		}).catch(function(err) {
		    // passing error from smart contract
		}).then(function() {
		    //console.log("tId: :", transferId);
		    return directProxyInstance.getTransfer.call(transferId,{from: aliceAddress});
		}).then(parseTransfer).then(function(transfer) {
		    //console.log("checking statas");
		    assert.equal(transfer.status, 0, "status is not updated to withdrawn.");		    		    		    
		    done();
		}).catch(done);
	});
	    


	xit("can be canceled by sender", function(done) {	    
	    getSentTransfer()
		.then(function(transfer) {
		    //console.log("transfer id: ", transfer);
		    return {tx: directProxyInstance.cancelTransfer(transfer.id, {from: aliceAddress, gas: 3000000}), transferId: transfer.id};
		}).then(function({tx, transferId}) {
		    //console.log(transferId);
		    return directProxyInstance.getTransfer.call(transferId, {from: bobAddress});
		}).then(parseTransfer).then(function(transfer) {
		    assert.equal(transfer.status, 2, "status is updated to cancelled (2).");		    		    		    
		    done();
		}).catch(done);
	});

	xit("cannot be canceled by receiver", function(done) {
	    var transferId;
	    getIncomingTransfer()
		.then(function(transfer) {
		    ////console.log("transfer id: ", transfer);
		    transferId = transfer.id;
		    return directProxyInstance.cancelTransfer(transfer.id, {from: bobAddress, gas: 3000000});
		}).catch(function(err) {
		    // passing error from smart contract
		}).then(function() {
		    //console.log("tId: :", transferId);
		    return directProxyInstance.getTransfer.call(transferId,{from: aliceAddress});
		}).then(parseTransfer).then(function(transfer) {
		    //console.log("checking statas");
		    assert.equal(transfer.status, 0, "status is not updated to cancelled.");		    		    		    
		    done();
		}).catch(done);
	});

	    
    });
});
