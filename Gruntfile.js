module.exports = function(grunt) {

  var
    path = require("path");

  grunt.initConfig({
    httpServer: {
      wwwRoot: "app/www",
      jsRoot: "app/www/js",
      cssRoot: "app/www/css",
      mediaRoot: "app/www/media",
      imageRoot: "app/www/i",
      libsRoot: "app/www/libs",
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
    },
    handlebars: {
			compile: {
				options: {
					namespace: "templates",
					processName: function(filePath) {
						return path.basename(filePath, ".min.hbs");
					},
					processPartialName: function(filePath) {
						return path.basename(filePath, ".min.hbs");
					}
				},
				files: {
					"app/www/js/templates.js": "app/templates-min/**/*.min.hbs"
				}
			}
		},
		htmlmin: {
			templates: {
	      options: {
	        removeComments: true,
	        collapseWhitespace: true
	      },
	      files: {
					"app/templates-min/transaction-record.min.hbs": "app/templates/transaction-record.hbs",
          "app/templates-min/transaction-records.min.hbs": "app/templates/transaction-records.hbs"
	      }
	    }
		},
		watch: {
			templates: {
				files: ["app/templates/**/*.hbs"],
				tasks: ["htmlmin", "handlebars"],
				options: {
					spawn: false
				}
			}
		}
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-handlebars");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");

	grunt.registerTask("web-server", "Start web server", function() {

		var
			httpServer = require("./app/http-server"),
      app = require("./app/app"),
      logger = global.logger = require("./app/logger.js")(grunt.config("logger"));
      config = {
        webSockets: require("./app/web-sockets"),
        httpServer: grunt.config("httpServer"),
        mongoServer: grunt.config("mongoServer"),
      };

    logger.info("starting app...");

    this.async();
    config.app = app(config);
    httpServer(config);
	});

	grunt.registerTask("default", ["htmlmin","handlebars","web-server","watch"]);


};
