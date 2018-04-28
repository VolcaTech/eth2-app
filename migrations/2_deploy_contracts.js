var VerifiedProxy = artifacts.require("./VerifiedProxy.sol");


module.exports = function(deployer, network, accounts) {
    console.log("hhey");
    var owner = accounts[0];
    console.log(owner);
    var fee = 0.01;    
    // "0x1b019c6f52c39e07e6c396ee1d0f957d3832d95d" - tesnet
    // 0xf695e673d7d159cbfc119b53d8928ceca4efe99e  - ropsten
    // HARDCODED VALUES for proof-of-concept 
    //var verifier = "0xf695e673d7d159cbfc119b53d8928ceca4efe99e";

    deployer.deploy(VerifiedProxy, web3.toWei(fee,  "ether"),  {from: owner});
};
