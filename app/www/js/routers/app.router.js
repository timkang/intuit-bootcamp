var AppRouter = Backbone.Router.extend({

	routes: {
		"": "showHome",
		"transactions": "showTransactions",
		"transaction/:transactionId": "showTransaction"
	},

	showHome: function() {
		if (this.currentView) {
			this.currentView.undelegateEvents();
		}
		this.currentView = new HomeView({
			el: this.options.el,
			router: this
		});
		this.currentView.render();
	},

	showTransactions: function() {

	},

	showTransaction: function(transactionId) {

	},

	initialize: function(options) {
		this.options = options;
	}

});
