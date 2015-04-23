var
	express = require("express"),
	csrf = require("csrf")(),
	router = express.Router();

router.route("/api").all(function(req, res, next) {

	// validate if a user is logged in
	if (!req.user) {
		res.status(401).end();
		return;
	}

	// validate the csrf token
	if (!csrf.verify(req.session.csrfSecret, req.get("X-CSRF-Token"))) {
		res.status(401).end();
		return;
	}

	// create a new secret and token on each request
	csrf.secret().then(function(secret) {
		req.session.csrfSecret = secret;
		res.set("X-CSRF-Token", csrf.create(req.session.csrfSecret));
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
