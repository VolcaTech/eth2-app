var DirectProxy = artifacts.require("./DirectProxy.sol");

module.exports = function(deployer) {
  deployer.deploy(DirectProxy);
};
