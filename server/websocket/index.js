import expressWs from 'express-ws';
import set from 'lodash/set';
import {
  CLOSE,
  NUMBER,
} from 'defaults';
import randomNumber from '../utils/randomNumber';

const opened = {};

export const sendToOpenedSocket = (ws, data) => {
  if (ws.readyState !== 1) {
    return;
  }

  ws.send(JSON.stringify(data));
};

export default function addWebSocketMiddleware(app) {
  if (!app) {
    return;
  }

  expressWs(app);

  app.ws('/', (ws) => {
    const id = Math.random();

    set(ws, 'id', id);

    opened[id] = ws;

    const unsubscribe = randomNumber.subscribe((number) => {
      const data = {
        value: number,
        timestamp: Number(new Date()),
      };

      sendToOpenedSocket(ws, { type: NUMBER, data });
    });

    ws.on(CLOSE, () => {
      delete opened[id];

      unsubscribe();
    });
  });
}
