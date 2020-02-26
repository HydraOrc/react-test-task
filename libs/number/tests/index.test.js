import { isNumeric } from '..';

describe('isNumeric', () => {
  it('Should check for isNumeric properly', () => {
    expect(isNumeric).not.toThrow();
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric(123.4)).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('123')).toBe(true);
    expect(isNumeric('123.4')).toBe(true);
    expect(isNumeric('1K')).toBe(false);
    expect(isNumeric('')).toBe(false);
  });
});
