import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks/reducer';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = applyMiddleware( promiseMiddleware() );

export default createStore( reducer, middleware );