import { NUMBER } from 'defaults';
import { registerWebsocketMessage } from 'client/websocket';
import { setNumber } from '../actions';

registerWebsocketMessage(NUMBER, (store, data) => {
  if (data.err) {
    console.log(err); // eslint-disable-line

    return;
  }

  store.dispatch(setNumber(data.data));
});
