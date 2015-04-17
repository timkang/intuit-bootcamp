module.exports = function(webServerConfig, webServerCallback) {

	var
		http = require("http"),
		express = require("express"),
		webSockets = require("./web-sockets.js"),
		app = express();

	app.use(express.static(webServerConfig.rootFolder));

	app.post("/uploads", function(req, res) {

		res.json({
			msg: "received"
		});

	});

	webSockets(http.createServer(app))
		.listen(webServerConfig.port, webServerCallback);

};
