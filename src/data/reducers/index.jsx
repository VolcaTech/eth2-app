import { combineReducers } from 'redux';
import web3Data from './web3Data';
import orm from './models';
import sendMode from './sendModes';


export default combineReducers({
    web3Data,
    orm,
    sendMode
});
