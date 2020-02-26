import get from 'lodash/get';
import { emptyArr, emptyObj, DIAPASONS, NOTIFICATION, NUMBER, LIST } from 'defaults';

export const getDiapasons = (state = emptyObj) => get(state, `${NUMBER}.${DIAPASONS}`, emptyObj);

export const getNumbers = (state = emptyObj) => get(state, `${NUMBER}.${LIST}`, emptyArr);

export const getNotification = (state = emptyObj) => get(state, `${NUMBER}.${NOTIFICATION}`, emptyObj);
