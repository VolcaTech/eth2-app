import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { setupWeb3 } from '../actions/web3';

import reducers from './reducers';

//import getWeb3 from '../utils/getWeb3';

const enhancers = compose(applyMiddleware(thunk));
const store = createStore(reducers, undefined, enhancers);

const configureStore = (store) => {

    // getWeb3().then(web3 => {
    // 	console.log("got web3");
    // 	console.log({web3});
    // });
    
    console.log("configuring store");
    store.dispatch(setupWeb3());
}

configureStore(store);


export default store;
