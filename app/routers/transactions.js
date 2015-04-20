module.exports = function(config) {

	var
		express = require("express"),
		mongoose = require("mongoose"),
		transactionsRouter = express.Router();

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	var transactionSchema = mongoose.Schema({
		accountNumber: String,
		payee: String,
		taxItem: String,
		amount: Number,
		description: String
	});

	var TransactionModel = mongoose.model("transaction", transactionSchema);

	transactionsRouter.route("/transactions")
		.get(function(req, res) {
			res.json([
				{ id: 1, payee: "Intuit", amount: "59.00" }
			]);
		});

	transactionsRouter.route("/transaction")
		.post(function(req, res) {

			var t = new TransactionModel(req.body.transaction);
			t.save(function(err, transaction) {

				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}

				res.json(transaction);

			});


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
