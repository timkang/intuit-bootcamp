var account = {
	__proto__: Object
	getCurrentBalance: function() {
		return this.currentBalance;
	}
};

var bankAccount = {
	__proto__: account,
	deposit: function(clams) {
		this.currentBalance += clams;
	},
	withdrawal: function(clams) {
		this.currentBalance -= clams;
	}
};

var checkingObject = {
	__proto__: bankAccount,
	currentBalance: 0
};

checkingObject.getCurrentBalance();
checkingObject.deposit(30);
