var Transaction = BaseModel.extend({
	urlRoot: "/api/transaction",
	defaults: {
		accountNumber: null,
		payee: null,
		taxItem: "No Tax Item 2",
		amount: null,
		description: null
	}
});
