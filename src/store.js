import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialstate={};
const middleware=[thunk];
console.log("here in store");
const store=createStore(
    rootReducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware)));
export default store;