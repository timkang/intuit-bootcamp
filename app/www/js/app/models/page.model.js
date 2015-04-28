var dependencies = ["marionette","backbone","jquery","underscore"];

function pageModelModule(Marionette, Backbone, $, _) {

	return function(module) {
		module.PageModel = Backbone.Model.extend({
			idAttribute: "_id"
		});
	};

}

define(dependencies, pageModelModule);
