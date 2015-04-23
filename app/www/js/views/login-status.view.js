var LoginStatusView = Backbone.View.extend({

	events: {
		"click #sign-in": "signIn",
		"click #sign-out": "signOut"
	},

	render: function() {

		if (!this.model) {
			this.$el.html(templates["login-form"]());
		} else {
			this.$el.html(templates["login-status"](this.model));
		}
	},

	initialize: function(options) {
		this.options = options;
	},

	signOut: function() {

		console.log("sign out");

	},

	signIn: function() {

		var
			xhr = new XMLHttpRequest(),
			that = this;

		xhr.onreadystatechange = function() {

			if (xhr.readyState > 1 && xhr.status > 299) {
				console.log("login failed");
				return;
			}

			if (xhr.readyState === 4) {
				window.csrfToken = xhr.getResponseHeader("X-CSRF-Token");
				window.user = JSON.parse(xhr.responseText);
				that.model = window.user;
				that.render();
				that.options.router.navigate(that.options.routeRedirect, {trigger: true});
			}
		}

		xhr.open("POST", "/api/accounts/authenticate");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(JSON.stringify({
			emailAddress: document.getElementById("login-email-address").value,
			password: document.getElementById("login-password").value
		}));

	}

});
