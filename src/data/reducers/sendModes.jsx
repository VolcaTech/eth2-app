import { combineReducers } from 'redux'
import {
    CHOOSE_SEND_MODE 
} from './../../actions/modes'

const sendMode = (state = 'phone number', action) => {
    let newState;
  switch (action.type) {
  case CHOOSE_SEND_MODE:
      newState = action.mode;
      break;
  default:
      newState = state;     
  }
    return newState || state;
}

export default combineReducers({
    sendMode
  })