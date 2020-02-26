import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from './store';
import patchStoreToDispatchWebsocketActions from './websocket';
import './css/ui.css';

patchStoreToDispatchWebsocketActions(store);

const app = document.getElementById('app');

const init = () => {
  render((
    <Provider store={store}>
      <App store={store} />
    </Provider>
  ), app);

  if (module.hot) {
    module.hot.accept();
  }
};

init();
