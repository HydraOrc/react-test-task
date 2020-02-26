import { getInitialState } from '../state';

describe('Number state', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getInitialState).not.toThrow();
  });
});
