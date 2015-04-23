var
	mongoose = require("mongoose"),
	express = require("express"),
	crypto = require("crypto"),
	csrf = require("csrf")(),
	validator = require("validator"),
	AccountModel = require("../mongoose/accounts.js"),
	router = express.Router();

router.route("/api/accounts/authenticate").post(function(req, res) {

	var
		salt = "salt rocks!",
		saltedPassword = crypto.createHash("sha1")
		.update(req.body.password.toString() + salt).digest("hex");

	logger.info("authenticate called");
	logger.info("email address: " + req.body.emailAddress);
	logger.info("salted password: " + saltedPassword);

	if (!validator.isEmail(req.body.emailAddress)) {
		logger.info("email address failed");
		return res.status(401).end();
	}

	AccountModel.findOne({
		emailAddress: req.body.emailAddress,
		password: saltedPassword
	}, function(err, account) {

		if (err || !account) return res.status(401).end();

		logger.info("account found");

		// convert mongo document to plain object, the process login
		account = account.toObject();
		req.login(account, function(err) {

			if (err) return res.status(500).json(err);

			logger.info("login processed");

			csrf.secret().then(function(secret) {

				req.session.csrfSecret = secret;
				res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));

				logger.info("csrf token create, responding with account");
				res.json(account);
			});

		});

	});

});

module.exports = router;
