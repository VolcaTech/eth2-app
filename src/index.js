import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import combineReducers from '/home/alex/Documents/eth2phone/src/data/reducers/index.js'

const store = createStore(
    combineReducers
)

ReactDOM.render(
    <Provider store={store}>
        <App /></Provider>,
    document.getElementById('root')
);
