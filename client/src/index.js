import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { compose, applyMiddleware, legacy_createStore } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers'

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById("root"));