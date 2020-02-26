import { getDiapasons, getNumbers, getNotification } from '../selectors';

describe('Number selectors', () => {
  it('Should not throw errors with empty arguments', () => {
    expect(getDiapasons).not.toThrow();
    expect(getNumbers).not.toThrow();
    expect(getNotification).not.toThrow();
  });
});
