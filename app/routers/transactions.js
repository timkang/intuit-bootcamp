module.exports = function(config) {

	var
		express = require("express");

	var transactionsRouter = express.Router();

	transactionsRouter.route("/transactions")
		.get(function(req, res) {
			res.json([
				{ id: 1, payee: "Intuit", amount: "59.00" }
			]);
		});

	transactionsRouter.route("/transaction")
		.post(function(req, res) {

		});

	transactionsRouter.route("/transaction/:transactionId")
		.get(function(req, res) {

		})
		.put(function(req, res) {

		})
		.delete(function(req, res) {

		});


	return transactionsRouter;


};
