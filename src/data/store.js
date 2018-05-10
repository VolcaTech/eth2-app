import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupWeb3, setupWeb3ChangeListener } from '../actions/web3';
import { subscribePendingTransfers, fetchWithdrawalEvents } from '../actions/transfer';




import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['orm'] // only navigation will be persisted
};


const persistedReducer = persistReducer(persistConfig, reducers);
const enhancers = compose(applyMiddleware(thunk));
const store = createStore(persistedReducer, undefined, enhancers);

persistStore(store, null, async () => {   
    window.INITIAL_HEIGHT = window.innerHeight;
    
    // setup web3 data
    await store.dispatch(setupWeb3());

    // find all pending transfers and update status when they will be mined
    store.dispatch(subscribePendingTransfers());

    // fetch withdrawal events
    store.dispatch(fetchWithdrawalEvents());

    // subscribe for account changes
    store.dispatch(setupWeb3ChangeListener());

    
    
});



export default store;
