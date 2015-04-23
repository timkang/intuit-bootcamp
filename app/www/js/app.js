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

	var appRouter = new AppRouter({
		el: $("#view")[0]
	});
	Backbone.history.start({ pushState: false });

	/*

	document.getElementById("get-all-transactions")
		.addEventListener("click", function() {
			transactions.fetch({
				success: function() {
					$("#view").append(templates["transaction-records"]({
						transactions:  transactions.toJSON()
					}));
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

			$("#view").append(templates["transaction-record"](t.attributes));
	});

	*/

});
