var
	dependencies = [
		"backbone", "marionette", "handlebars", "jquery",
		"underscore"
	];

function module(Backbone, Marionette, Handlebars, $, _) {

	return function(app) {

		app.module("Views", function(Views, App, Backbone, Marionette, $, _) {

			Views.RootView = Marionette.LayoutView.extend({
				el: "#app",
				template: "#layout-template",
				regions: {
					pageHeader: "#page-header",
					pageContent: "#page-content",
					pageFooter: "#page-footer"
				},
			});

			Views.SettingsView = Marionette.LayoutView.extend({
				template: "#settings-template",
				regions: {
					UserSettings: "#user-settings",
					ProjectSettings: "#project-settings",
					DefaultSettings: "#default-settings"
				},
				onShow: function() {

					var that = this;
					this.UserSettings.show(new Views.UserSettingsView());
					that.ProjectSettings.show(new Views.ProjectSettingsView());

					/*
					setTimeout(function() {
						that.ProjectSettings.show(new Views.ProjectSettingsView());
					}, 2000);

					setTimeout(function() {
						//that.ProjectSettings.reset();
						that.ProjectSettings.currentView.destroy();
					}, 4000);
					*/

					this.DefaultSettings.show(new Views.DefaultSettingsView());
				}
			});

			Views.HeaderView = Marionette.ItemView.extend({
				template: "#header-template"
			});

			Views.ToDoListView = Marionette.ItemView.extend({
				template: "#content-template"
			});

			Views.FooterView = Marionette.ItemView.extend({
				template: "#footer-template"
			});

			Views.UserSettingsView = Marionette.ItemView.extend({
				template: "#user-settings-template"
			});

			Views.ProjectSettingsView = Marionette.ItemView.extend({
				template: "#project-settings-template"
			});

			Views.DefaultSettingsView = Marionette.ItemView.extend({
				template: "#default-settings-template"
			});

		});
	};
}

define(dependencies, module);
