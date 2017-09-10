pragma solidity 0.4.15;
import './Owned.sol';
import './SafeMath.sol';


contract VerifiedProxy is Ownable, SafeMath {

  // Status codes
  enum Statuses {
    ACTIVE, // awaiting withdrawal
    COMPLETED, // recepient have withdrawn the transfer
    CANCELLED  // sender has cancelled the transfer
  }

  // fixed amount of wei accrued to verifier with each transfer
  uint public commissionFee;

  // verifier can withdraw this amount from smart-contract
  uint public commissionToWithdraw; // in wei

  // gas cost to withdraw transfer
  uint private WITHDRAW_GAS_COST = 60000;
  /*
   * EVENTS
   */
  event LogDeposit(
		   address indexed from,
		   bytes32 indexed transferId,
		   uint amount,
		   uint commission,
		   uint gasPrice // for verifier to withdraw to recipient with the same gas price
		   );


  event LogCancel(
		  address indexed from,
		  bytes32 indexed transferId,
		            uint amount
		  );


  event LogWithdraw(
		    bytes32 indexed transferId,
		    address indexed sender,
		    address indexed recipient,
		                  uint amount
		    );


  event LogWithdrawCommission(
			                      uint commissionAmount
			      );


  event LogChangeFixedCommissionFee(
				    uint oldCommissionFee,
				        uint newCommissionFee
				    );


  struct Transfer {
    uint8 status; // 0 - active, 1 - completed, 2 - cancelled;
    address from;
    uint amount; // in wei
    uint commission; // in wei
    address verificationPubKey;
  }

  // Mappings of TransferId => Transfer Struct
  mapping (bytes32 => Transfer) transferDct;


  // CONSTRUCTOR
  function VerifiedProxy(uint _commissionFee) {
    commissionFee = _commissionFee;
  }


  // deposit ether to smart contract
  function deposit(address _verPubKey, bytes32 _transferId)
                payable
    returns(bool)
  {
    // can not override old transfer
    require(transferDct[_transferId].verificationPubKey == 0);

    uint transferGasCommission = safeMul(tx.gasprice, WITHDRAW_GAS_COST);
    uint transferCommission = safeAdd(commissionFee,transferGasCommission);
    require(msg.value > transferCommission);

    // saving transfer details
    transferDct[_transferId] = Transfer(
					uint8(Statuses.ACTIVE),
					msg.sender,
					safeSub(msg.value, transferCommission), // excluding comission
					commissionFee,
					 _verPubKey
					);

    // verification server commission accrued
    commissionToWithdraw = safeAdd(commissionToWithdraw, transferCommission);
    LogDeposit(msg.sender, _transferId, msg.value, transferCommission, tx.gasprice);
    return true;
  }


  function changeFixedCommissionFee(uint _newCommissionFee)
              onlyOwner
    returns(bool success)
  {
    uint oldCommissionFee = commissionFee;
    commissionFee = _newCommissionFee;
    LogChangeFixedCommissionFee(oldCommissionFee, commissionFee);
    return true;
  }

  function withdrawCommission()
    returns(bool success)
  {
    uint commissionToTransfer = commissionToWithdraw;
    commissionToWithdraw = 0;
    owner.transfer(commissionToTransfer);

    LogWithdrawCommission(commissionToTransfer);
    return true;
  }

  function getTransfer(bytes32 _transferId)
                constant
    returns (
	     bytes32 id,
	     uint status, // 0 - active, 1 - completed, 2 - cancelled;
	     address from,
	     uint amount,
	     uint commsission)
  {
    Transfer memory transfer = transferDct[_transferId];
    return (
	    _transferId,
	    transfer.status,
	    transfer.from,
	    transfer.amount,
	            transfer.commission
	    );
  }


  function cancelTransfer(bytes32 _transferId) returns (bool success) {
    Transfer storage transferOrder = transferDct[_transferId];
    // checks
    require(msg.sender == transferOrder.from); // only sender can cancel transfer;
    require(transferOrder.status == uint8(Statuses.ACTIVE)); // only pending transfers can be cancelled;
    transferOrder.status = uint8(Statuses.CANCELLED);

    // transfer ether back to sender
    transferOrder.from.transfer(transferOrder.amount);
    LogCancel(msg.sender, _transferId, transferOrder.amount);
    return true;
  }


  function verifySignature(
			   address _verPubKey,
			   address _recipient,
			   uint8 _v,
			   bytes32 _r,
			   bytes32 _s)
    constant returns(bool success)
  {
    bytes32 prefixedHash = sha3("\x19Ethereum Signed Message:\n32", _recipient);
    address retAddr = ecrecover(prefixedHash, _v, _r, _s);
    return retAddr == _verPubKey;
  }


  function verifyTransferSignature(
				   bytes32 _transferId,
				   address _to,
				   uint8 _v,
				   bytes32 _r,
				   bytes32 _s)
    constant returns(bool success)
  {
    Transfer memory transferOrder = transferDct[_transferId];
    return (verifySignature(transferOrder.verificationPubKey, _to, _v, _r, _s));
  }


  function withdraw(
		    bytes32 _transferId,
		    address _recipient,
		    uint8 _v,
		    bytes32 _r,
		    bytes32 _s)
    onlyOwner // only through verifier can withdraw transfer;
    returns (bool success)
  {
    Transfer storage transferOrder = transferDct[_transferId];

    // checks
    require(transferOrder.status == uint8(Statuses.ACTIVE)); // only active transfers can be withdrawn;
    require(verifySignature(transferOrder.verificationPubKey, _recipient, _v, _r, _s )); // verifying signature

    transferOrder.status = uint8(Statuses.COMPLETED);

    // transfer ether back to sender
    _recipient.transfer(transferOrder.amount);
    LogWithdraw(_transferId, transferOrder.from, _recipient, transferOrder.amount);
    return true;
  }


  // fallback function - do not receive ether by default
  function() payable {
    revert();
  }
}
