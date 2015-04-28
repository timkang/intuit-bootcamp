var dependencies = [
	"marionette","backbone","jquery","underscore",
	"app/app.models","app/app.collections","app/app.views"];

define(dependencies, function(Marionette, Backbone, $, _) {

		return function(app) {

			app.module("Routers", function(Routers, App, Backbone, Marionette, $, _) {

				this.AppRouter = Marionette.AppRouter.extend({
					controller: {
						index: function() {
							App.rootView.getRegion("content").show(new App.Views.ContentView());
						},
						pages: function() {

							var pages = new App.Collections.PageCollection();
							pages.add(new App.Models.PageModel({
								_id: 1, name: "Home", slug: "/"
							}));
							pages.add(new App.Models.PageModel({
								_id: 2, name: "About", slug: "/about"
							}));
							pages.add(new App.Models.PageModel({
								_id: 3, name: "Mission", slug: "/mission"
							}));

							App.rootView.getRegion("content").show(new App.Views.PageListView({
								collection: pages
							}))
						}
					},
					appRoutes: {
						"": "index",
						"pages": "pages"
					},
					initialize: function(options) {
						this.options = options;
					}
				});

			});

		};

	});
