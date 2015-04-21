module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		multer = require("multer"),
		session = require('express-session'),
		passport = require("passport"),
		crypto = require("crypto"),
		app = express();

	passport.serializeUser(function(user, done) {
  	done(null, user);
	});

	passport.deserializeUser(function(user, done) {
  	done(null, user);
	});

	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret : "asecret"
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(express.static(config.httpServer.wwwRoot));

	app.use("/api", bodyParser.json());
	app.use("/api", multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));
	app.use("/api", require("./routers/transactions.js")(config));

	app.post("/api/accounts/authenticate", function(req, res, next) {

		var passwordSalt = "salt is good for you";

		var user = {
			id: 1,
			name: "Test User",
			username: req.body.username
		};

		function sha1(value) {
			return crypto.createHash("sha1").update(value.toString()).digest("hex");
		}

		console.log(sha1(req.body.password + passwordSalt));


		req.login(user, function(err) {

			if (err) {
				console.dir(err);
				res.status(500).json(err);
				return;
			}

			res.json(user);
		});

	});

	return app;
};
