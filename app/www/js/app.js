var transactions = new Transactions();

window.addEventListener("DOMContentLoaded", function() {

	document.getElementById("sign-in")
		.addEventListener("click", function() {

			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {

				if (xhr.readyState > 1 && xhr.status > 299) {
					console.log("login failed");
					return;
				}

				if (xhr.readyState === 4) {
					window.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
					console.log("successful!");
				}
			}

			xhr.open("POST", "/api/accounts/authenticate");
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify({
				emailAddress: document.getElementById("login-email-address").value,
				password: document.getElementById("login-password").value
			}));
	});

	document.getElementById("get-all-transactions")
		.addEventListener("click", function() {
			transactions.fetch({
				success: function() {
					console.log(transactions.models);
					/*
					var source = document.getElementById("transaction-records").innerHTML;
					var template = Handlebars.compile(source);
					var html = template({
						transactions:  transactions.toJSON()
					});
					document.getElementById("view").innerHTML = html;
				  */
				}
			})
		});

	document.getElementById("create-transaction")
		.addEventListener("click", function() {
			transactions.create({
				"accountNumber" : 1,
				"payee" : "Intuit",
				"taxItem" : "Business Deduction",
				"amount" : 39.0000000000000000,
				"description" : "Paid My Quickbooks Subscription Fee"
			});
		});

	document.getElementById("add-transaction")
		.addEventListener("click", function() {

			var t = new Transaction({});
			t.set("accountNumber", 345);
			t.set("payee", "Intuit");
			t.set("taxItem", "Payroll");
			t.set("amount", 230);
			t.set("description", "Because I love paying people...");
			t.save(null, {
				success: function() {
					console.dir(t.attributes);
				}
			});

			transactions.add(t);

			var source = document.getElementById("transaction-record").innerHTML;
			var template = Handlebars.compile(source);
			var html = template(t.attributes);
			document.getElementById("view").innerHTML = html;

	});

});
