var
	mongoose = require("mongoose"),

	transactionSchema = mongoose.Schema({
		accountNumber: String,
		payee: String,
		taxItem: String,
		amount: Number,
		description: String
	}),

	TransactionModel = mongoose.model("transaction", transactionSchema);

module.exports = TransactionModel;
