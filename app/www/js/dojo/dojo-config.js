var dojoConfig = {
	async: true,
	//cacheBust: true,
	isDebug: true,
	//parseOnLoad: true,
	//deps: ["dojo/parser"],
	packages: [
		{ name: "myapp", location: "../../js/myapp" },
		{ name: "jquery", location: "../jquery/dist", main: "jquery" },
		{ name: "underscore", location: "../underscore", main: "underscore" },
		{ name: "backbone", location: "../backbone", main: "backbone" },
		{ name: "marionette", location: "../backbone.marionette", main: "backbone.marionette" }
	]
};
