var HomeView = Backbone.View.extend({

	render: function() {
		this.$el.html(templates["home"]());
	},

	initialize: function(options) {
		this.options = options;
	}

});
