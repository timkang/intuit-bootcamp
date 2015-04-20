module.exports = function(config) {

  var
    express = require("express"),
    bodyParser = require("body-parser"),
    multer = require("multer"),
    mongoose = require("mongoose"),
    fs = require('fs'),
    app = express();

  app.use(express.static(config.httpServer.wwwRoot));

  mongoose.connect("mongodb://" +
    config.mongoServer.host + ":" + config.mongoServer.port
    + "/" + config.mongoServer.dbName);

  app.use("/api", bodyParser.json());
  app.use("/api", require("./router/pages.js")(config, mongoose));
  app.use("/api", require("./router/donations.js")(config, mongoose));
  app.use("/api", require("./router/galleries.js")(config, mongoose));

  var fileSchema = mongoose.Schema({
    fileName: String,
    data: Buffer
  });

  var FileModel = mongoose.model("file", fileSchema);

  app.use(multer({
		dest: "./app/uploads",
		rename: function(fieldName, fileName) {
			return fileName;
		},
    onFileUploadComplete: function(file, req, res) {
      console.log(file.originalname + ' uploaded to ' + file.path);
      var media = new FileModel();
      fs.readFile(file.path, function(err, data){
        media.data = data;
        media.save(function (err, media) {
          if (err) throw err;

          console.error('saved img to mongo');
        });
      });
      return;
    }

	}));

	app.post("/uploads", function(req, res) {

    console.dir(req);
    
		res.json({
			msg: "received"
		});

	});


  // app.use(multer({
  //   dest: "./uploads",
  //   rename: function(fieldName, fileName) {
  //     return fileName;
  //   },
  //   onFileUploadStart: function(file, req, res) {
  //     console.log(file.originalname + ' is starting ...');
  //     return;
  //   },
  //   onFileUploadData: function(file, data, req, res) {
  //     console.log(data.length/file.size * 100 + '% of ' + file.originalname + ' has arrived ...');
  //     (function logProgress(dataLength) {
  //
  //     })(data.length);
  //     return;
  //   },
  //   onFileUploadComplete: function(file, req, res) {
  //     console.log(file.originalname + ' uploaded to ' + file.path);
  //     return;
  //   }
  //
  // }));


  // app.post("/uploads", function(req, res) {
  //
  //   res.json({
  //     msg: "received"
  //   });
  //
  // });

  return app;

}
