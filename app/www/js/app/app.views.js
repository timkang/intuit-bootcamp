define(["marionette","backbone","handlebars","jquery","underscore"],
	function(Marionette, Backbone, Handlebars, $, _) {

		return function(app) {

			app.module("Views", function(Views, App, Backbone, Marionette, $, _) {

				this.RootView = Marionette.LayoutView.extend({
					el: 'body',
					template: "#root-template",
					regions: {
						header: "#page-header",
						content: "#main-content"
					}
				});

				this.HeaderView = Marionette.ItemView.extend({
					template: "#header-template"
				});

				this.ContentView = Marionette.ItemView.extend({
					template: "#content-template"
				});

				this.PageItemView = Marionette.ItemView.extend({
					tagName: "tr",
					template: Handlebars.compile("<td>{{_id}}</td><td>{{name}}</td><td>{{slug}}</td>")
				});

				this.PageListView = Marionette.CollectionView.extend({
					tagName: "table",
					className: "table table-bordered",
					childView: Views.PageItemView
				});

			});

		};

	});
