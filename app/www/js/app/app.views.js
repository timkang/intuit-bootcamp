define(["marionette","backbone","handlebars","jquery","underscore"],
	function(Marionette, Backbone, Handlebars, $, _) {

		return function(app) {

			app.module("Views", function(Views, App, Backbone, Marionette, $, _) {

				Views.RootView = Marionette.LayoutView.extend({
					el: 'body',
					template: "#root-template",
					regions: {
						header: "#page-header",
						content: "#main-content"
					}
				});

				Views.HeaderView = Marionette.ItemView.extend({
					template: "#header-template",
					onShow: function() {
						console.log("header show");
					}
				});

				Views.ContentView = Marionette.ItemView.extend({
					template: "#content-template",
					onShow: function() {
						console.log("content show");
					}
				});

				Views.MissionView = Marionette.ItemView.extend({
					template: "#mission-template"
				});

				Views.TeamView = Marionette.ItemView.extend({
					template: "#team-template",
					onShow: function() {
						console.log("team view showed");
					},
					onDestroy: function() {
						console.log("team view destroyed");
					}
				});

				Views.HistoryView = Marionette.ItemView.extend({
					template: "#history-template"
				});

				Views.AboutView = Marionette.LayoutView.extend({
					template: "#about-template",
					regions: {
						Mission: "#mission-content",
						Team: "#team-content",
						History: "#history-content"
					},
					// onShow - works but does more repaints
					onBeforeShow: function() {
						console.log("about view showed");
						this.Mission.show(new Views.MissionView({
							model: new Backbone.Model({
								missionContent: "Our mission is to change the world!"
							})
						}));
						var that = this;

						setTimeout(function() {
							that.Team.show(new Views.TeamView());
						},1000);

						setTimeout(function() {
							that.Team.reset(); // reset the whole region
							//that.Team.currentView.destroy(); // reference the current view and destroy it
						},2000);

						this.History.show(new Views.HistoryView());
					},
					onAttach: function() {
						console.log("attach event fired");
					}
				});

				Views.PageItemView = Marionette.ItemView.extend({
					tagName: "tr",
					template: Handlebars.compile("<td>{{_id}}</td><td>{{name}}</td><td>{{slug}}</td>"),
				});

				Views.PageListView = Marionette.CollectionView.extend({
					tagName: "table",
					className: "table table-bordered",
					childView: Views.PageItemView,
				});

			});

		};

	});
