var e2pEscrow = artifacts.require("./e2pEscrow.sol");


module.exports = function(deployer, network, accounts) {
    console.log("hhey");
    var owner = accounts[0];
    var verifier = accounts[1];    
    console.log({owner, verifier});
    var fee = 0.01;    

    deployer.deploy(e2pEscrow, web3.toWei(fee,  "ether"), verifier,  {from: owner});
};
