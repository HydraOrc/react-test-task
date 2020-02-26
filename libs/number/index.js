import isUndefined from 'lodash/isUndefined';
import { NUMBER, STRING } from 'defaults';

const numericTypes = [NUMBER, STRING];

export function isNumeric(x) {
  if (numericTypes.indexOf(typeof x) === -1) {
    return false;
  }

  const str = `${x}`;

  return !isNaN(x) && !isUndefined(str[0]);
}
