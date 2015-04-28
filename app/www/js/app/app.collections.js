define(["marionette","backbone","jquery","underscore", "app/app.models"],
	function(Marionette, Backbone, $, _) {

		return function(app) {
			app.module("Collections", function(Collections, App, Backbone, Marionetter, $, _) {
				this.PageCollection = Backbone.Collection.extend({
					model: App.Models.PageModel
				});
			});
		};

	});
