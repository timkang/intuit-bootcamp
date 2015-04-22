module.exports = function(config) {

	var
		express = require("express"),
		bodyParser = require("body-parser"),
		multer = require("multer"),
		session = require('express-session'),
		passport = require("passport"),
		crypto = require("crypto"),
		csrf = require('csrf')();
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

	app.set("json replacer", function(key, value) {
		if (key === "__v") {
			return undefined;
		}
		return value;
	});

	app.use(passport.initialize());
	app.use(passport.session());


	app.use("/api", bodyParser.json());
	//app.use("/api", bodyParser.urlencoded({ extended: true }));

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


			csrf.secret().then(function(secret) {
				req.session.secret = secret;
				res.set("X-CSRF-Token", csrf.create(req.session.secret));
				res.json(user);
			});

		});

	});

	app.use("/api", function(req, res, next) {

		if (!req.user) {
			console.log("unauthorized");
			res.status(401).end();
			return;
		}

		var tokenToValidate = req.get("X-CSRF-Token");
		if (!csrf.verify(req.session.secret, tokenToValidate)) {
			console.log("bad token");
			res.status(401).end();
			return;
		} else {
			delete req.session.secret;
		}

		csrf.secret().then(function(secret) {
			req.session.secret = secret;
			res.set("X-CSRF-Token", csrf.create(req.session.secret));
			next();
		});

	});

	app.use("/api", multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));

	app.use("/api", require("./routers/transactions.js")(config));

	app.use(express.static(config.httpServer.wwwRoot));

	return app;
};
