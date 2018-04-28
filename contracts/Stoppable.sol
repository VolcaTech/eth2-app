pragma solidity ^0.4.23;

import './Pausable.sol';


/**
 * @title Stoppable
 * @dev Base contract which allows children to implement final irreversible stop mechanism.
 */
contract Stoppable is Pausable {
  event Stop();

  bool public stopped = false;


  /**
   * @dev Modifier to make a function callable only when the contract is not stopped.
   */
  modifier whenNotStopped() {
    require(!stopped);
    _;
  }

  /**
   * @dev Modifier to make a function callable only when the contract is stopped.
   */
  modifier whenStopped() {
    require(stopped);
    _;
  }

  /**
   * @dev called by the owner to pause, triggers stopped state
   */
  function stop() public onlyOwner whenNotStopped {
    stopped = true;
    emit Stop();
  }
}
