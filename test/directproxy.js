var DirectProxy = artifacts.require("./DirectProxy.sol");

contract('DirectProxy', function(accounts) {

    it(" check 1 test.", function() {
	console.log("in directproxy.js");
	return DirectProxy.deployed().then(function(instance) {
	    directProxyInstance = instance;	    
	    return directProxyInstance.set(89, {from: accounts[0]});
	}).then(function() {
	    return directProxyInstance.get.call();
	}).then(function(storedData) {
	    assert.equal(storedData, 89, "The value 89 was not stored.");
	});
    });
    
});
