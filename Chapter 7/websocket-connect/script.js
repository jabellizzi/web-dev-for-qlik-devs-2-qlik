// Connect WebSocket
var ws = new WebSocket('ws://localhost:4848/app');


// function to run everytime WebSocket connects
ws.onopen = function(event) {
  console.log('Connected', event);
};


// function to run everytime WebSocket closes
ws.onclose = function(event) {
  console.log('Disconnected', event)
};


// function to run everytime WebSocket returns a message
ws.onmessage = function(event) {
  console.log(JSON.parse(event.data));
};


// function to run everytime WebSocket returns an error
ws.onerror = function(event) {
  console.log(event);
};


// OpenDoc
function openDoc() {
	var openDocRequest = {
		"jsonrpc": "2.0",
		"id": 0,
		"method": "OpenDoc",
		"handle": -1,
		"params": ["C:\\Users\\jbellizzi\\Documents\\Qlik\\Sense\\Apps\\Helpdesk Management.qvf"]
	};
	
	ws.send(JSON.stringify(openDocRequest));
}