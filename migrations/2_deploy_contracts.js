var DirectProxy = artifacts.require("./DirectProxy.sol");
var VerifiedProxy = artifacts.require("./VerifiedProxy.sol");

module.exports = function(deployer) {
    deployer.deploy(DirectProxy);
    // "0x1b019c6f52c39e07e6c396ee1d0f957d3832d95d" - tesnet
    // 0xf695e673d7d159cbfc119b53d8928ceca4efe99e  - ropsten
    var verifier = "0xf695e673d7d159cbfc119b53d8928ceca4efe99e";  // "0x1b019c6f52c39e07e6c396ee1d0f957d3832d95d";//web3.eth.accounts[1];//"0xeaa6ca321825a54665286a981d069bb53aa62e7f";
    deployer.deploy(VerifiedProxy, verifier, web3.toWei(0.01,  "ether"));
};
