var transactions = new Transactions();

window.addEventListener("DOMContentLoaded", function() {

	debugger;

	var appRouter = new AppRouter({
		el: $("#view-content")[0]
	});

  var loginStatusView = new LoginStatusView({
   el: $("#view-login-status")[0],
   router: appRouter,
   routeRedirect: "transactions",
   model: null
  });
  loginStatusView.render();

	Backbone.history.start({ pushState: true });

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
