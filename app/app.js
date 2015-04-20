module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		multer = require("multer"),
		app = express();

	app.use(express.static(config.httpServer.wwwRoot));
	app.use("/api", bodyParser.json());
	app.use("/api", multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));
	app.use("/api", require("./routers/transactions.js")(config));

	return app;
};
