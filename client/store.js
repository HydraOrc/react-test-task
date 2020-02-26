import { createStore, compose } from 'redux';
import get from 'lodash/get';
import { emptyObj } from 'defaults';
import reducers from './reducers';

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose;

export function createReduxStore(initial = get(global, '__REDUX_STORE__', emptyObj)) {
  const store = global.__STORE__ = createStore(
    reducers,
    initial,
    composeEnhancers(),
  );

  return store;
}

export default createReduxStore();
