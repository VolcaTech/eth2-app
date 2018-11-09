import {
    CHOOSE_SEND_MODE 
} from './../../actions/modes';

const sendMode = (state = 'link', action) => {
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

export default sendMode;
