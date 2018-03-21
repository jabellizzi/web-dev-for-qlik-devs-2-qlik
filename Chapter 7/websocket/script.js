var ws = new WebSocket('ws://echo.websocket.org');

ws.onopen = function(event) {
  console.log('Connected', event);
};

ws.onclose = function(event) {
  console.log('Disconnected', event)
};

ws.onmessage = function(event) {
  console.log(event);
};

ws.onerror = function(event) {
  console.log(event);
};

function sendRequest() {
  ws.send('testing');
}