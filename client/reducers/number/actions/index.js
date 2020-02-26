import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import set from 'lodash/set';
import { emptyObj, NOTIFICATION, THRESHOLD } from 'defaults';
import { isNumeric } from 'libs/number';
import {
  getInitialState,
  lessThanZero,
  betweenZeroAndFifty,
  moreThanFifty,
} from '../state';

export const SET_NUMBER = 'NUMBER_SET_ITEM';
export const SET_THRESHOLD = 'NUMBER_SET_THRESHOLD';

const reducer = {};

export const setNumber = (number = {}) => {
  return {
    type: SET_NUMBER,
    number,
  };
};

const maxListSize = 50;

export function getDiapason(val) {
  if (val < 0) {
    return lessThanZero;
  }

  if (val > 50) {
    return moreThanFifty;
  }

  return betweenZeroAndFifty;
}

reducer[SET_NUMBER] = (state, { number }) => {
  const { timestamp, value } = number;

  const diapason = getDiapason(value);

  const key = `${timestamp}-${value}`;

  const { diapasons, list } = state;

  const lastItem = list[list.length - 1];

  const lastTimestamp = lastItem && lastItem.x;

  const newNumber = {
    x: timestamp,
    y: value,
    key,
  };

  set(diapasons, `${diapason}.${timestamp}`, newNumber);

  if (lastTimestamp && lastTimestamp > timestamp) { // check if timestamp is not last in the stored list
    const index = list.findIndex((item) => item.x > timestamp);

    if (index === -1) {
      list.unshift(newNumber);
    } else {
      list.splice(index, 0, newNumber);
    }
  } else {
    list.push(newNumber);
  }

  if (list.length > maxListSize) {
    const prevFirstItem = list[0];

    const { x, y } = prevFirstItem;

    delete diapasons[getDiapason(y)][x];

    list.splice(0, list.length - maxListSize);
  }

  const { threshold } = state;

  if (isNumeric(threshold) && value > threshold) {
    set(state, NOTIFICATION, {
      err: true,
      text: `${value}`,
    });
  }

  return state;
};

export const setThreshold = (threshold) => {
  return {
    type: SET_THRESHOLD,
    threshold,
  };
};

reducer[SET_THRESHOLD] = (state, { threshold }) => {
  set(state, THRESHOLD, threshold);
  set(state, NOTIFICATION, emptyObj);

  return state;
};

export const numberReducer = function numberReducer(state = getInitialState(), action = {}) {
  if (!isFunction(get(reducer, action.type))) {
    return state;
  }

  return reducer[action.type](state, action);
};
