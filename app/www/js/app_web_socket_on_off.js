
function MyWebSocket(webSocketServerURL) {

	this.connected = new Promise(function(resolve, reject) {
		var ws = new WebSocket(webSocketServerURL);
		ws.addEventListener("open", function() {
			resolve(ws);
		});
	});
}

MyWebSocket.prototype.sendObject = function(obj) {
	this.connected.then(function(ws) {
		ws.send(JSON.stringify(obj));
	});
};

MyWebSocket.prototype.onReceiveObject = function(callbackFn) {
	this.connected.then(function(ws) {
		ws.addEventListener("message", function(message) {
			callbackFn(JSON.parse(message.data));
		});
	});
};

MyWebSocket.prototype.on = function(eventName, callbackFn) {
	this.connected.then(function(ws) {
		ws.addEventListener(eventName, callbackFn);
	});
};

MyWebSocket.prototype.off = function(eventName, callbackFn) {
	this.connected.then(function(ws) {
		ws.removeEventListener(eventName, callbackFn);
	});
};

function LoggingWebSocket(webSocketServerURL) {
	LoggingWebSocket.prototype._super.call(this, webSocketServerURL);
}
LoggingWebSocket.prototype = Object.create(MyWebSocket.prototype);
LoggingWebSocket.prototype.constructor = LoggingWebSocket;
LoggingWebSocket.prototype._super = MyWebSocket;
LoggingWebSocket.prototype.sendLogMessage = function(logMessage) {
	this.sendObject({
		type: "log",
		source: "log: " + logMessage
	});
};

var mws = new MyWebSocket("ws://localhost:8080");

mws.on("error", function(err) {

});

mws.onReceiveObject(function(o) {
	console.log("Mws Recv: " + o.source);
});

var lws = new LoggingWebSocket("ws://localhost:8080");

lws.onReceiveObject(function(o) {
	console.log("Lws Recv: " + o.source);
});

lws.sendLogMessage("user logged in - lws");
lws.sendLogMessage("user logged out - lws");
lws.sendLogMessage("error occurred - lws");

mws.sendObject({
	source: "mws message"
});

console.log(mws.sendObject === lws.sendObject);
