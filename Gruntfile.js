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
    },
    logger: {
      transports: {
        console: {
          level: "debug",
          colorize: true,
          timeStamp: true
        },
        file: {
          level: "debug",
          fileName: "logs/app.log",
          timeStamp : true
        }
      }
    }
  });

	grunt.registerTask("webServer", "Start web server", function() {

		var
			httpServer = require("./app/http-server"),
      app = require("./app/app"),
      logger = require("./app/logger.js")(grunt.config("logger"));
      config = {
        webSockets: require("./app/web-sockets"),
        httpServer: grunt.config("httpServer"),
        mongoServer: grunt.config("mongoServer")
      };

    logger.info("starting app...");

    this.async();
    config.app = app(config);
    httpServer(config, logger);
	});

	grunt.registerTask("default", ["webServer"]);


};
