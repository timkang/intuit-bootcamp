module.exports = function(webServerConfig, webServerCallback) {

	var
		http = require("http"),
		express = require("express"),
		webSockets = require("./web-sockets.js"),
		app = express();

	app.use(express.static(webServerConfig.rootFolder));

	webSockets(http.createServer(app))
		.listen(webServerConfig.port, webServerCallback);

};
