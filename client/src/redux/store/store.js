import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = store => next => action => {
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getState())
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger),));
export default store