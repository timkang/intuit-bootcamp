var ws = new WebSocket("ws://localhost:8080");

ws.addEventListener("open", function() {
	ws.send(JSON.stringify({
		message: "Hi!"
	}));
});

ws.addEventListener("message", function(msg) {
	console.log("message received: " + msg.data);
	console.dir(JSON.parse(msg.data));
});

ws.addEventListener("error", function(err) {
	console.log("err received: " + JSON.stringify(err));
});
