var DirectProxy = artifacts.require("./DirectProxy.sol");
var VerifiedProxy = artifacts.require("./VerifiedProxy.sol");

module.exports = function(deployer) {
    deployer.deploy(DirectProxy);
    var verifier = "0xeaa6ca321825a54665286a981d069bb53aa62e7f";
    deployer.deploy(VerifiedProxy, verifier, web3.toWei(0.01,  "ether"));
};
