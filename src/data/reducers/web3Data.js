import { combineReducers } from 'redux';
import * as actionTypes from './../../actions/types';


const address = (state = null, action) => {
    let newState;
  switch (action.type) {
  case actionTypes.UPDATE_WEB3_DETAILS:
      newState = action.payload.address;
      break;
  default:
      newState = state;     
  }
    return newState || state;
}


const balance = (state = 0, action) => {
  switch (action.type) {
  case actionTypes.UPDATE_WEB3_DETAILS:
  case actionTypes.UPDATE_BALANCE:
      return action.payload.balance;
    default:
      return state;
  }
}


const loaded = (state = false, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_WEB3_DETAILS:
      return true;
    default:
      return state;
  }
}


const connected = (state = false, action) => {
  switch (action.type) {
  case actionTypes.UPDATE_WEB3_DETAILS:
      return action.payload.connected;
    default:
      return state;
  }
}


const networkName = (state = null, action) => {
  switch (action.type) {
  case actionTypes.UPDATE_WEB3_DETAILS:
      return action.payload.networkName;
    default:
      return state;
  }
}


const networkId = (state = -1, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_WEB3_DETAILS:
      return action.payload.networkId;
    default:
      return state;
  }
}


export default combineReducers({
    address,
    balance,
    connected,
    networkName,
    networkId,
    loaded
})

