import { emptyObj } from 'defaults';

export const lessThanZero = '<0';
export const betweenZeroAndFifty = '0-50';
export const moreThanFifty = '>50';

export const getInitialState = () => ({
  diapasons: {
    [lessThanZero]: emptyObj,
    [betweenZeroAndFifty]: emptyObj,
    [moreThanFifty]: emptyObj,
  },
  list: [],
  notification: emptyObj,
  threshold: null,
});
