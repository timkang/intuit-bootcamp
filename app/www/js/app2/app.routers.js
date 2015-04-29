var
	dependencies = [
		"backbone", "marionette", "handlebars", "jquery",
		"underscore"
	];

function module(Backbone, Marionette, Handlebars, $, _) {

	return function(app) {
		app.module("Routers", function(Routers, App, Backbone, Marionette, $, _) {

			Routers.AppRouter = Marionette.AppRouter.extend({
				controller: {
					showHome: function() {
						App.rootView.getRegion("pageContent").show(new App.Views.ToDoListView());
					},
					showSettings: function() {
						App.rootView.getRegion("pageContent").show(new App.Views.SettingsView());
					}
				},
				appRoutes: {
					"": "showHome",
					"settings": "showSettings"
				}
			});

		});
	};
}

define(dependencies, module);
