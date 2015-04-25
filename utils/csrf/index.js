var
	http = require("http"),
	express = require("express"),
	app = express();

app.use(express.static("www"));

http.createServer(app).listen(8085, function() {
	console.log("web server started on port 8085");
});
