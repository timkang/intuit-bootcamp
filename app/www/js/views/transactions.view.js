var TransactionsView = Backbone.View.extend({

	render: function() {
		this.$el.html(templates["transactions"]())
	},

	initialize: function(options) {
		this.options = options;
	}

});
