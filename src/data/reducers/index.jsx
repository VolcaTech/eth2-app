import { combineReducers } from 'redux';
import web3Data from './web3Data';
import orm from './models';


export default combineReducers({
    web3Data,
    orm
});
