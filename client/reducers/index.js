import produce from 'immer';
import { combineReducers } from 'redux-immer';
import { numberReducer } from './number';

export default combineReducers(produce, {
  number: numberReducer,
});
