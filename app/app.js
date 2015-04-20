module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		multer = require("multer"),
		app = express();

	console.log(config.httpServer.wwwRoot);

	app.use(express.static(config.httpServer.wwwRoot));

	app.use("/api", bodyParser.json());
	app.use("/api", require("./routers/transactions.js")(config));

	/*
	app.use(multer({
		dest: "./uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));
	*/

	/*
	app.post("/uploads", function(req, res) {

		res.json({
			msg: "received"
		});

	});
	*/

	return app;

};
