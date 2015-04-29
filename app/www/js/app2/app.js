var
	dependencies = [
		"backbone", "marionette", "handlebars", "jquery",
		"underscore", "i18n!app2/nls/label", "app2/app.config", "app2/app.models",
		"app2/app.collections", "app2/app.views", "app2/app.routers"
	];

function module(
	Backbone, Marionette, Handlebars, $, _, label, appConfig,
	appModels, appCollections, appViews, appRouters) {

	console.dir(label);

	var ToDoListApp = Marionette.Application.extend({

		initialize: function() {

			var that = this;

			this.on("start", function() {

				appConfig(that);
				appModels(that);
				appCollections(that);
				appViews(that);
				appRouters(that);

				that.rootView = new that.Views.RootView();
				that.rootView.render();
				that.rootView.getRegion("pageHeader").show(new that.Views.HeaderView());
				that.rootView.getRegion("pageFooter").show(new that.Views.FooterView());

				that.appRouter = new that.Routers.AppRouter();
				Backbone.history.start();
			});

		}
	});

	$(document).ready(function() {

		var toDoListApp = new ToDoListApp();
		toDoListApp.start();
	});


}

define(dependencies, module);
