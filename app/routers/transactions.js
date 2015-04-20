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
			TransactionModel.find({}, function(err, transactions) {
				if (err) {
					console.log(err);
					res.status(500).json(err);
					return;
				}
				res.json(transactions);
			});
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
			TransactionModel.findById(req.params.transactionId,
				function(err, transaction) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(transaction);
				});
		})
		.put(function(req, res) {
			TransactionModel.findByIdAndUpdate(req.params.transactionId,
				req.body.transaction,
				function(err, transaction) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(transaction);
				});
		})
		.delete(function(req, res) {
			TransactionModel.findByIdAndRemove(req.params.transactionId,
				function(err, transaction) {
					if (err) {
						console.log(err);
						res.status(500).json(err);
						return;
					}
					res.json(transaction);
				});
		});


	return transactionsRouter;


};
