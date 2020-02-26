import combineReducers from '..';

describe('Reducers folder', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(combineReducers).not.toThrow();
  });
});
