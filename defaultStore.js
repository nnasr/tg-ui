import { createStore, applyMiddleware } from 'redux';
import index from './index';
import thunk from 'redux-thunk';

const defaultState =  {};

// configuration for redux store
export const defaultStore = createStore(
  index,
  defaultState,
  applyMiddleware(thunk)
);

export default defaultStore;
