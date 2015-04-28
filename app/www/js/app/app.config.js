define(["marionette","backbone","handlebars"], function(Marionette, Backbone, Handlebars) {

	Backbone.Marionette.TemplateCache.prototype.loadTemplate = function(templateId, options){
		if (typeof templateId === "function") {
			return templateId
		}
		return $(templateId).html();
	}

	Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate, options) {
		if (typeof rawTemplate === "function") {
			return rawTemplate;
		}
		return Handlebars.compile(rawTemplate);
	}

	Backbone.Marionette.Renderer.render = function(template, data){
		var templateFn = Marionette.TemplateCache.get(template);
		return templateFn(data);
	};

});
