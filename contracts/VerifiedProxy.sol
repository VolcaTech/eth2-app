pragma solidity 0.4.15;

contract VerifiedProxy {

  uint private counter; // for setting transfer id
  address public verifier; // address of the verification server
  uint public commission; // in wei

  struct Transfer {
    uint id;
    uint status; // 0 - pending, 1 - closed, 2 - cancelled;
    address from;
    uint amount;
    uint blocknumber;
  }

  // key value mappings
  mapping (uint => Transfer) transferDct;
  mapping (address => uint[]) senderDct;
  mapping (address => uint) pubKeyDct;

  function VerifiedProxy(address _verifier, uint _comission) {
    counter = 0;
    verifier = _verifier;
    commission = _comission;
  }

  // deposit ether to smart contract
  function deposit(address pubKey) payable returns(uint id) {
    require(msg.value > 0); // throw if no value sent
    require(msg.value > commission);
    counter += 1;

    // saving transfer details
    transferDct[counter] = Transfer(
				    counter,
				    0, // pending status
				    msg.sender,
				    (msg.value - commission), // minus verification fee
				        block.number
				    );

    // add transfer to mappings
    senderDct[msg.sender].push(counter);
    pubKeyDct[pubKey] = counter;

    // send fee to verification server
    verifier.transfer(commission);

    return counter;
  }


  function getSentTransfersCount() constant returns(uint count) {
    return senderDct[msg.sender].length;
  }

  // get transfer from sender list by index
  function getSentTransfer(uint transferIndex) constant returns (uint id,
								 uint status, // 0 - pending, 1 - closed, 2 - cancelled;
								 address from,
								 uint amount,
								 uint blocknumer) {
    uint transferId = senderDct[msg.sender][transferIndex];
    Transfer memory transfer = transferDct[transferId];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
	    transfer.amount,
	            transfer.blocknumber
	    );
  }

  // get transfer from sender list by index
  function getTransferByPubKey(address pubKey) constant returns (uint id,
								 uint status, // 0 - pending, 1 - closed, 2 - cancelled;
								 address from,
								 uint amount,
								 uint blocknumber) {
    Transfer memory transfer = transferDct[pubKeyDct[pubKey]];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
	    transfer.amount,
	            transfer.blocknumber
	    );
  }

  function getTransfer(uint transferId) constant returns (uint id,
							  uint status, // 0 - pending, 1 - closed, 2 - cancelled;
							  address from,
							  uint amount,
							  uint blocknumber) {
    Transfer memory transfer = transferDct[transferId];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
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

  function verifySignature(address to, uint8 v, bytes32 r, bytes32 s)
    constant returns(address retAddr) {
    bytes32 prefixedHash = sha3(to);
    retAddr = ecrecover(prefixedHash, v, r, s);
  }  

    function withdraw
      (address pubKey, address to, uint8 v, bytes32 r, bytes32 s)
      returns (bool) {
      Transfer storage transferOrder = transferDct[pubKeyDct[pubKey]];

      // checks
      require(msg.sender == verifier); // only through verifier can withdraw transfer;
      require(transferOrder.status == 0); // only pending transfers can be withdrawn;
      require(verifySignature(to, v, r, s ) == pubKey);
      transferOrder.status = 1; // closed

      // transfer ether back to sender
      to.transfer(transferOrder.amount);

      return true;
    }

    // fallback function
    function() payable {
      // do not receive ether by default
      revert();
    }
}
