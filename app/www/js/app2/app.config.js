var
	dependencies = [
		"backbone", "marionette", "handlebars", "jquery",
		"underscore"
	];

function module(Backbone, Marionette, Handlebars, $, _) {

	return function(app) {

		app.module("Config", function(Config, App, Backbone, Marionette, $, _) {

			Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId, options){
				console.log("load template");
				return $(templateId).html();
			}

			Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate, options) {
				console.log("compile template");
				return Handlebars.compile(rawTemplate);
			}

			Backbone.Marionette.Renderer.render = function(template, data){
				var templateFn = Marionette.TemplateCache.get(template);
				return templateFn(data);
			};

		});

	};
}

define(dependencies, module);
