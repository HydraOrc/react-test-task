import useWebsocket, { executeWebsocketRequest, registerWebsocketMessage } from '..';

describe('WebSocket client side library', () => {
  it('Should connect to the WebSocket without errors', () => {
    expect(useWebsocket).not.toThrow();
  });

  it('Should execute WebSocket request without errors', () => {
    expect(executeWebsocketRequest).not.toThrow();
  });

  it('Should register WebSocket message without errors', () => {
    expect(registerWebsocketMessage).not.toThrow();
  });
});
