var dojoConfig = {
	async: true,
	cacheBust: true,
	isDebug: true,
	callback: function(parser) {
		console.log("dependencies loaded...");
	},
	parseOnLoad: true,
	deps: ["dojo/parser"],
	waitSeconds: 10,
	locale: "en-US",
	//map: {
	//			"*": { ready: "dojo/domReady" }
	//	},
	packages: [
		{ name: "app", location: "libs" },
		{ name: "dojo-bootstrap", location: "../../libs/dojo-bootstrap" },
		{ name: "jquery", location: "../../libs/jquery/dist", main: "jquery" },
		{ name: "underscore", location: "../../libs/underscore", main: "underscore" },
		{ name: "backbone", location: "../../libs/backbone", main: "backbone" },
		{ name: "handlebars", location: "../../libs/handlebars", main: "handlebars" }
	]
};
