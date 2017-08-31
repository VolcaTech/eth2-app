pragma solidity 0.4.15;

contract DirectProxy {

  uint private counter; // for setting transfer id
  struct Transfer {
    uint id;
    uint status; // 0 - pending, 1 - closed, 2 - cancelled;
    address from;
    address to;
    uint amount;
    uint blocknumber;
  }

  // key value mappings
  mapping (uint => Transfer) transferDct;
  mapping (address => uint[]) senderDct;
  mapping (address => uint[]) receiverDct;

  function DirectProxy() {
    counter = 0;
  }

  // deposit ether to smart contract
  function deposit(address receiver) payable returns(uint id) {
    require(msg.value > 0); // throw if no value sent
    counter += 1;

    // saving transfer details
    transferDct[counter] = Transfer(
				    counter,
				    0, // pending status
				    msg.sender,
				    receiver,
				    msg.value,
				    block.number
				    );

    // add transfer to mappings
    senderDct[msg.sender].push(counter);
    receiverDct[receiver].push(counter);

    return counter;
  }


  function getSentTransfersCount() constant returns(uint count) {
    return senderDct[msg.sender].length;
  }

  function getIncomingTransfersCount() constant returns(uint count) {
    return receiverDct[msg.sender].length;
  }

  // get transfer from sender list by index
  function getSentTransfer(uint transferIndex) constant returns (uint id,
								 uint status, // 0 - pending, 1 - closed, 2 - cancelled;
								 address from,
								 address to,
								 uint amount,
								 uint blocknumer) {
    uint transferId = senderDct[msg.sender][transferIndex];
    Transfer memory transfer = transferDct[transferId];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
	    transfer.to,
	    transfer.amount,
	    transfer.blocknumber
	    );
  }

  // get transfer from sender list by index
  function getIncomingTransfer(uint transferIndex) constant returns (uint id,
								     uint status, // 0 - pending, 1 - closed, 2 - cancelled;
								     address from,
								     address to,
								     uint amount,
								     uint blocknumber) {
    uint transferId = receiverDct[msg.sender][transferIndex];
    Transfer memory transfer = transferDct[transferId];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
	    transfer.to,
	    transfer.amount,
	    transfer.blocknumber
	    );
  }

  function getTransfer(uint transferId) constant returns (uint id,
							     uint status, // 0 - pending, 1 - closed, 2 - cancelled;
							     address from,
							     address to,
							  uint amount,
							  uint blocknumber) {
    Transfer memory transfer = transferDct[transferId];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
	    transfer.to,
	    transfer.amount,
	    transfer.blocknumber
	    );
  }

  
  function cancelTransfer(uint transferId) returns (bool) {
    Transfer storage transferOrder = transferDct[transferId];
    // checks
    require(msg.sender == transferOrder.from); // only sender can cancel transfer;
    require(transferOrder.status == 0); // only pending transfers can be cancelled;
    transferOrder.status = 2; // cancelled

    // transfer ether back to sender
    transferOrder.from.transfer(transferOrder.amount);
    return true;
  }

  function withdraw(uint transferId) returns (bool) {
    Transfer storage transferOrder = transferDct[transferId];

    /* // checks */
    require(msg.sender == transferOrder.to); // only receiver can withdraw transfer;
    require(transferOrder.status == 0); // only pending transfers can be withdrawn;
    transferOrder.status = 1; // closed

    // transfer ether back to sender
    transferOrder.to.transfer(transferOrder.amount);
    return true;
  }

  // fallback function
  function() payable {
    // do not receive ether by default
    revert();
  }
}

