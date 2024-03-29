module.exports = function(config) {

	var
		mongoose = require("mongoose"),
		express = require("express"),
		bodyParser = require("body-parser"),
		multer = require("multer"),
		session = require('express-session'),
		cookieParser = require('cookie-parser'),
		passport = require("passport"),
		crypto = require("crypto"),
		csrf = require("csrf")(),
		path = require("path"),
		app = express(),
		indexPath = path.resolve(path.join("app", "www", "index.html")),
		backboneIndexPath = path.resolve(path.join("app", "www", "index_backbone.html")),
		marionetteIndexPath = path.resolve(path.join("app", "www", "index_marionette.html"));

	// connect to mongo
	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	// serialize account id to session
	passport.serializeUser(function(account, done) {
  	done(null, account._id);
	});

	// deserialize account from the database using is from session
	passport.deserializeUser(function(accountId, done) {
		require("./mongoose/accounts.js")
			.findById(accountId, function(err, account) {
				done(null, account.toObject());
			});
	});

	// serve all static files regardless
	//app.use(express.static(config.httpServer.wwwRoot));
	app.use("/js", express.static(config.httpServer.jsRoot, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/javascript");
			if (/.gz.js$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	// no longer needed because uglify is combining the lib files with the app files
	app.use("/libs", express.static(config.httpServer.libsRoot));

	app.use("/css", express.static(config.httpServer.cssRoot, {
		setHeaders: function(res, filePath) {
			res.setHeader("Content-Type", "text/css");
			if (/.gz.css$/.test(filePath)) {
				res.setHeader("Content-Encoding", "gzip");
			}
		}
	}));

	app.use("/i", express.static(config.httpServer.imageRoot));
	app.use("/media", express.static(config.httpServer.mediaRoot));

	// add a json replacer to remove undesired fields from mongo
	app.set("json replacer", function(key, value) {
		if (key === "__v") {
			return undefined;
		}
		return value;
	});

	// parse cookies...
	app.use(cookieParser());

	// sessions are used for password and CSRF token ONLY
	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret : "asecret"
	}));

	// setup passport for session based logins
	app.use(passport.initialize());
	app.use(passport.session());

	app.use("/api", bodyParser.json());
	// disable to help guard against CSRF
	// app.use("/api", bodyParser.urlencoded({ extended: true }));

	// authenticate all API requests
	//app.use(require("./routers/authenticate"));

	// validate logged in and tokens for all API requests
	//app.use(require("./routers/api-request-validator"));

	// configure file uploads
	app.use("/api", multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		}
	}));

	// load REST service endpoints
	app.use("/api", require("./routers/default.js")("transaction"));
	app.use("/api", require("./routers/default.js")("account"));

	app.use("/index_backbone.html", function(req, res) {
		res.sendFile(backboneIndexPath, function(err) {
			if (err) res.status(err.status).end();
		});
	});

	app.use("/index_marionette.html", function(req, res) {
		res.sendFile(marionetteIndexPath, function(err) {
			if (err) res.status(err.status).end();
		});
	});

	// all other requests should return index.html
	// needed for HTML5 history API
	app.use("/", function(req, res) {
		res.sendFile(indexPath, function(err) {
			if (err) res.status(err.status).end();
		});
	});

	return app;
};
