module.exports = function(grunt) {

  grunt.initConfig({
    httpServer: {
      wwwRoot: "app/www",
      port: 8080,
      callback: function() {
  			grunt.log.writeln("Web server listening on port " + this.port);
  		}
    },
    mongoServer: {
      host: "localhost",
      port: 27017,
      dbName: "Intuit"
    }
  });

	grunt.registerTask("webServer", "Start web server", function() {

		var
			httpServer = require("./app/http-server"),
      app = require("./app/app"),
      config = {
        webSockets: require("./app/web-sockets"),
        httpServer: grunt.config("httpServer"),
        mongoServer: grunt.config("mongoServer")
      };

    console.log(config);

    this.async();
    config.app = app(config);
    httpServer(config);
	});

	grunt.registerTask("default", ["webServer"]);


};
