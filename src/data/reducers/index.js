import { combineReducers } from 'redux'
import { UPDATE_ADDRESS } from '/home/alex/Documents/eth2phone/src/actions/index.js'

function address(state = null, action) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return action.address
    default:
      return state
  }
}

export default combineReducers({
  address
})