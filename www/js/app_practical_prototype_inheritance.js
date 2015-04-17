
function Account() { }

// a property (data or function) off of the function object is
// thought to be static
// Account.staticProperty

// inheritance properties, should be function object properties only
Account.prototype.getCurrentBalance = function() {
	return this.currentBalance;
};

function BankAccount() { }
BankAccount.prototype = Object.create(Account.prototype);
BankAccount.prototype.constructor = BankAccount;
BankAccount.prototype.deposit = function(clams) {
	this.currentBalance += clams;
};
BankAccount.prototype.withdrawal = function(clams) {
	this.currentBalance -= clams;
};

function CheckingAccount() {
	// instance property, should be non-function object data properties
	this.currentBalance = 0;
}
CheckingAccount.prototype = Object.create(BankAccount.prototype);
CheckingAccount.prototype.constructor = CheckingAccount;

var ca = new CheckingAccount();
ca.deposit(30);
console.log(ca.getCurrentBalance());
console.dir(ca);
