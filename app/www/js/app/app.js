var dependencies = [
	"marionette", "backbone","handlebars",
	"app/app.config","app/app.models","app/app.collections",
	"app/app.views","app/app.routers"
];

function appInit(
	Marionette, Backbone, Handlebars,
	appConfig, appModels, appCollections,
	appViews, appRouters) {

	var SampleApp = Marionette.Application.extend({
		initialize: function(options) {

			this.options = options;
			var that = this;

			this.on("start", function() {

				appModels(that);
				appCollections(that);
				appViews(that);
				appRouters(that);

				that.rootView = new that.Views.RootView();
				that.rootView.render();
				that.rootView.getRegion("header").show(new that.Views.HeaderView());
				console.log(that.rootView.getRegion("header").hasView());

				that.appRouter = new that.Routers.AppRouter();
				Backbone.history.start();
			});
		}
	});

	$(document).ready(function() {
		(window.sampleApp = new SampleApp()).start();
	});

}

define(dependencies, appInit);
