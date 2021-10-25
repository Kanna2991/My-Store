import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const middlewares = compose(applyMiddleware(
    thunk, logger
))

const store = createStore(combineReducers({rootReducer}), {}, middlewares);

export default store;