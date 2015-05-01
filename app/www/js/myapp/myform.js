define(["dijit/_WidgetBase", "dojo/parser",
	"dojo/ready", "dojo/_base/declare", "dojo/dom-construct",
	"dijit/_TemplatedMixin", "dojo/text!./tpl2.html"],
	function(_WidgetBase, parser, ready, declare,
		domConstruct, _TemplatedMixin, template) {

		declare("DemoWidget", [_WidgetBase, _TemplatedMixin], {

			templateString: template,

			_setFirstNameAttr: function(value) {
				this.firstNameField.value = value
			},

			_getFirstNameAttr: function() {
				return this.firstNameField.value;
			},

			_setLastNameAttr: function(value) {
				this.lastNameField.value = value
			},

			_getLastNameAttr: function() {
				return this.lastNameField.value;
			},

			_setEmailAttr: function(value) {
				this.emailField.value = value
			},

			_getEmailAttr: function() {
				return this.emailField.value;
			},

			constructor: function(params, nodeRef) {
				this.params = params;
			},

			postCreate: function() {
				this.connect(this.submitButton, "click", "submitPerson");
			},

			submitPerson: function() {

				var person = {
					firstName: this.firstNameField.value,
					lastName: this.lastNameField.value,
					email: this.emailField.value
				}

				console.dir(person);

			}

		});
});
