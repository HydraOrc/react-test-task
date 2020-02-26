import { SET_NUMBER, setNumber, getDiapason, setThreshold, numberReducer } from '../actions';
import { getInitialState } from '../state';

describe('Number reducer and actions', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(setNumber).not.toThrow();
    expect(getDiapason).not.toThrow();
    expect(setThreshold).not.toThrow();
    expect(numberReducer).not.toThrow();
  });
});

describe('SET_NUMBER handler', () => {
  it('Should set a simple number', () => {
    let state = getInitialState();

    const timestamp = Date.now();

    const value = 0.15;

    const number = {
      timestamp,
      value,
    };

    state = numberReducer(state, {
      type: SET_NUMBER,
      number,
    });

    expect(state.list[0].y).toBe(value);
  });
});
