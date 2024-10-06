// src/websocket.js
const websocketUrl = 'wss://stream.binance.com:9443/ws';

let socket;

export const connectWebSocket = (symbol, interval, onMessage) => {
  socket = new WebSocket(`${websocketUrl}/${symbol.toLowerCase()}@kline_${interval}`);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const kline = message.k;

    if (kline && kline.x) {
      const price = parseFloat(kline.c);
      const time = new Date(kline.t);
      onMessage({ time, price });
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
