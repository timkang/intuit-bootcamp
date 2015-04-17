"use strict";

var p = new Promise(function(resolve, reject) {

	setTimeout(function() {

		resolve("all is good...");

	}, 2000);

});

p.then(function(result) {
	console.log("resolve msg: " + result);
});
