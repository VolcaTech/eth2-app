import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupWeb3 } from '../actions/web3';


import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['orm'] // only navigation will be persisted
};


const persistedReducer = persistReducer(persistConfig, reducers);
const enhancers = compose(applyMiddleware(thunk));
const store = createStore(persistedReducer, undefined, enhancers);

persistStore(store, null, () => {
    console.log("configuring store..");
    store.dispatch(setupWeb3());
    const state = store.getState();
    console.log({state});
});



export default store;
