pragma solidity 0.4.15;

contract VerifiedProxy {

  //uint private counter; // for setting transfer id
  address public verifier; // address of the verification server
  uint public commission; // in wei

  struct Transfer {
    bytes32 id;
    uint status; // 0 - pending, 1 - closed, 2 - cancelled;
    address from;
    uint amount;
    uint blocknumber;
    address verificationPubKey;
  }

  // key value mappings
  mapping (bytes32 => Transfer) transferDct;
  mapping (address => bytes32[]) senderDct;

  function VerifiedProxy(address _verifier, uint _comission) {
    verifier = _verifier;
    commission = _comission;
  }

  // deposit ether to smart contract
  function deposit(address pubKey, bytes32 transferHash) payable returns(bool) {
    require(msg.value > 0); // throw if no value sent
    require(msg.value > commission);

    // saving transfer details
    transferDct[transferHash] = Transfer(
					 transferHash,
					 0, // pending status
					 msg.sender,
					 (msg.value - commission), // minus verification fee
					 block.number,
					     pubKey
					 );

    // add transfer to mappings
    senderDct[msg.sender].push(transferHash);

    // send fee to verification server
    verifier.transfer(commission);

    return true;
  }


  function getSentTransfersCount() constant returns(uint count) {
    return senderDct[msg.sender].length;
  }

  // get transfer from sender list by index
  function getSentTransfer(uint transferIndex) constant returns (bytes32 id,
								 uint status, // 0 - pending, 1 - closed, 2 - cancelled;
								 address from,
								 uint amount,
								 uint blocknumer) {
    bytes32 transferId = senderDct[msg.sender][transferIndex];
    Transfer memory transfer = transferDct[transferId];
    return (
	    transfer.id,
	    transfer.status,
	    transfer.from,
	    transfer.amount,
	    transfer.blocknumber
	    );
  }


  function getTransfer(bytes32 transferId) constant returns (bytes32 id,
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


  function cancelTransfer(bytes32 transferId) returns (bool) {
    Transfer storage transferOrder = transferDct[transferId];
    // checks
    require(msg.sender == transferOrder.from); // only sender can cancel transfer;
    require(transferOrder.status == 0); // only pending transfers can be cancelled;
    transferOrder.status = 2; // cancelled

    // transfer ether back to sender
    transferOrder.from.transfer(transferOrder.amount);
    return true;
  }

  function verifySignature(address verPubKey, address to, uint8 v, bytes32 r, bytes32 s)
    constant returns(bool) {
    bytes32 prefixedHash = sha3(to);
    address retAddr = ecrecover(prefixedHash, v, r, s);
    return retAddr == verPubKey;
  }

  function verifyTransferSignature(bytes32 transferId, address to, uint8 v, bytes32 r, bytes32 s)
    constant returns(bool) {
    Transfer memory transferOrder = transferDct[transferId];
    return (verifySignature(transferOrder.verificationPubKey, to, v, r, s ));
  }

      function withdraw
	(bytes32 transferId, address to, uint8 v, bytes32 r, bytes32 s)
	returns (bool) {
	Transfer storage transferOrder = transferDct[transferId];

	// checks
	require(msg.sender == verifier); // only through verifier can withdraw transfer;
	require(transferOrder.status == 0); // only pending transfers can be withdrawn;
	require(verifySignature(transferOrder.verificationPubKey, to, v, r, s )); //
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
