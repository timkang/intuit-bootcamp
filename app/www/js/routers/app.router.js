var AppRouter = Backbone.Router.extend({

	routes: {
		"": "showHome",
		"transactions": "showTransactions",
		"transaction/:transactionId": "showTransaction"
	},

	showHome: function() {

		// only do this if a new is being created
		if (this.currentView) {
			this.currentView.undelegateEvents();
		}

		// create a new view
		this.currentView = new HomeView({
			// passing the element passed into the router
			el: this.options.el,
			// give view access to the router to navigate in response to events
			router: this
		});

		// render the new view
		this.currentView.render();
	},

	showTransactions: function() {
		if (this.currentView) {
			this.currentView.undelegateEvents();
		}
		this.currentView = new TransactionsView({
			el: this.options.el,
			router: this
		});
		this.currentView.render();
	},

	showTransaction: function(transactionId) {

	},

	initialize: function(options) {
		this.options = options;
	}

});
