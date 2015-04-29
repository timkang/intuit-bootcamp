var
	dependencies = [
		"backbone", "marionette", "handlebars", "jquery",
		"underscore"
	];

function module(Backbone, Marionette, Handlebars, $, _) {

	return function(app) {

		app.module("Models", function(Models, App, Backbone, Marionette, $, _) {
		});
	};

}

define(dependencies, module);
