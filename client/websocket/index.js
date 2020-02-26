import each from 'lodash/each';
import isFunction from 'lodash/isFunction';
import { emptyFunc, emptyObj, OPEN } from 'defaults';

const connectionString = `ws${location.protocol === 'https:' ? 's' : ''}://${location.host || 'localhost'}`;

let interval;
let queue = [];

let ws = {
  send: emptyFunc,
};

const messages = {};

const closeCodes = [2, 3];

export default function patchStoreToDispatchWebsocketActions(store) {
  function start() {
    ws = new WebSocket(connectionString);

    function onClose() {
      ws.onclose = null;
      ws.onerror = null;
      ws.onopen = null;
      ws.onmessage = null;

      window.clearInterval(interval);

      setTimeout(() => {
        check(); // eslint-disable-line
      }, 5000);
    }

    ws.onclose = onClose;

    ws.onerror = () => {
      if (closeCodes.indexOf(ws.readyState) !== -1) {
        onClose();
      }
    };

    ws.onopen = () => {
      interval = window.setInterval(() => {
        executeWebsocketRequest(OPEN); // eslint-disable-line
      }, 1500);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.type === OPEN) {
        if (interval) {
          window.clearInterval(interval);
          interval = null;
          executeQueue(); // eslint-disable-line
        }

        return;
      }

      if (!isFunction(messages[data.type])) {
        return;
      }

      messages[data.type](store, data);
    };
  }

  function check() {
    if (!ws || ws.readyState === WebSocket.CLOSED) {
      start();
    }
  }

  start();
}

const executeQueue = () => {
  each(queue, ({ type, data }) => {
    executeWebsocketRequest(type, data); // eslint-disable-line
  });

  queue = [];
};

export const executeWebsocketRequest = (type, data = emptyObj) => {
  if (!global.__CLIENT__) {
    return;
  }

  if (!ws || !ws.readyState || ws.readyState !== WebSocket.OPEN) {
    queue.push({ type, data });

    return;
  }

  const send = {
    type,
    data,
  };

  ws.send(JSON.stringify(send));
};

export const registerWebsocketMessage = (type, func) => {
  messages[type] = (store, data = emptyObj) => {
    const { err } = data;

    if (err === 401 && location.pathname !== '/') {
      location.pathname = '/';
      return;
    }

    func(store, data);
  };
};
