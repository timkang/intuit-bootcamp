var
	express = require("express"),
	csrf = require("csrf")(),
	router = express.Router();

router.use("/api", function(req, res, next) {

	logger.info("beginning validation");

	// validate if a user is logged in
	if (!req.user) {
		res.status(401).end();
		return;
	}

	logger.info("user is logged in");

	// validate the csrf token
	if (!csrf.verify(req.session.csrfSecret, req.get("X-CSRF-Token"))) {
		res.status(401).end();
		return;
	}

	logger.info("csrf is valid");

	// create a new secret and token on each request
	csrf.secret().then(function(secret) {
		req.session.csrfSecret = secret;
		res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));

		logger.info("new token generated");

		next();
	});


});

/*
app.use("/", function(req, res, next) {
	if (req.path === "/" || req.path === "/index.html") {
		csrf.secret().then(function(secret) {
			req.session.csrfSecret = secret;
			res.cookie("csrf-token", csrf.create(req.session.csrfSecret))
			next();
		});
		return;
	}
	next();
});
*/

module.exports = router;
