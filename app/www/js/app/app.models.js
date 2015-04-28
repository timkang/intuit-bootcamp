define(["marionette","backbone","jquery","underscore", "app/models/page.model"],
	function(Marionette, Backbone, $, _, pageModel) {

		return function(app) {
			app.module("Models", function(Models, App, Backbone, Marionette, $, _) {

				pageModel(Models);

			});
		};

	});
