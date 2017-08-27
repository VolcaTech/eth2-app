var DirectProxy = artifacts.require("./DirectProxy.sol");
var Promise = require('bluebird');

Promise.promisifyAll(web3.eth, {suffix: "Promise"});

contract('DirectProxy', function(accounts) {
    var aliceAddress,
	bobAddress,
	initialBalances = {
	    Bob: 0,
	    Alice: 0,
	    contract: 0
	},
	 directProxyInstance;

    
    before("deploy and prepare", function() {
	console.log("in describe before each..");
	DirectProxy.deployed().then(function(instance) {
	    console.log("instance deployed: ");
	    directProxyInstance = instance;
	});
    });

    beforeEach("init values", function() {
	console.log("in describe before each..");
	aliceAddress = accounts[1];
	bobAddress = accounts[2];
	web3.eth.getBalancePromise(aliceAddress).then(function(result) {
	    console.log("got alice balance: ", result.toString());
	    initialBalances.alice = result;
	});
	web3.eth.getBalancePromise(bobAddress).then(function(result) {
	    console.log("got Bob's balance: ", result.toString());
	    initialBalances.bob = result;
	});
	web3.eth.getBalancePromise(directProxyInstance.address).then(function(result) {
	    console.log("got contract's balance: ", result.toString());
	    initialBalances.contract = result;		
	});
    });

    it("contract should not accept ether to address", function() {
	web3.eth.sendTransactionPromise({to: directProxyInstance.address, from: aliceAddress, value: 0.1 * 1000000000000000000})
	    .then(function(result) {
		return web3.eth.getBalancePromise(directProxyInstance.address);
	    }).then(function(contractBalanceAfterTx) {
		assert.equal(initialBalances.contract.toString(), contractBalanceAfterTx.toString(), "Ether was sent to contract's address");
	    });
    });
    
    // describe("Alice sends 3.5 ether to Bob", function() {
    // 	console.log("in describe..");
	
    // 	it("ether is correctly transfered", function() {
    // 	    directProxyInstance.deposit({to: bobAddress}, {from: aliceAddress, value: 1000})
    // 		.then(function(result) {
    // 		    console.log("got result: ", result)
    // 		});
    // 	    //console.log(" in 1st test", directProxyInstance);
	    
    // 	    // directProxyInstance.set(89, {from: accounts[0]})
    // 	    // 	.then(function() {
    // 	    // 	    return directProxyInstance.get.call();
    // 	    // 	}).then(function(storedData) {
    // 	    // 	    assert.equal(storedData, 89, "The value 89 was not stored.");
    // 	    // 	});
    // 	});

    // });
});
