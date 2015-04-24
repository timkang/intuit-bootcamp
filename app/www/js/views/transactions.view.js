var TransactionsView = Backbone.View.extend({

	render: function() {
		var that = this;
		this.collection.fetch({
			success: function() {
				that.$el.html(templates["transactions"]({ transactions: that.collection.toJSON() }))
			}
		});
	},

	initialize: function(options) {
		this.options = options;
	}

});
