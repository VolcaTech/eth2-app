pragma solidity ^0.4.2;

contract DirectProxy {
  function deposit(address to) payable returns(bool) {

  }

  // fallback function  
  function() payable {
      // do not receive ether by default
    revert();
      }
}
