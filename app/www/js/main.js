require.config({
	paths: {
		jquery: "../libs/jquery/dist/jquery",
		bootstrap: "../libs/bootstrap/dist/js/bootstrap",
		underscore: '../libs/underscore/underscore',
		backbone: '../libs/backbone/backbone',
		"backbone.stickit": "../libs/backbone.stickit/backbone.stickit",
		marionette: '../libs/backbone.marionette/backbone.marionette',
		handlebars:'../libs/handlebars/handlebars'
	},

	shim: {
		jquery: {
			exports: '$'
		},
		bootstrap: {
			deps: ["jquery"]
		},
		underscore: {
			exports: '_'
		},
	  backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		"backbone.stickit": {
			deps: ["backbone"]
		},
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		}
	}
});

requirejs(['app/app']);
