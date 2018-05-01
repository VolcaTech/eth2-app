import { combineReducers } from 'redux';
import * as actionTypes from './../../actions/types';


const address = (state = null, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_WEB3_DETAILS:
      return action.payload.address;
    default:
      return state;
  }
}


const balance = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_WEB3_DETAILS:
      return action.payload.balance;
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
    networkId
})

