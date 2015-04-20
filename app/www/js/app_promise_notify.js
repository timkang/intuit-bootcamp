"use strict";

var d = Q.defer();

d.promise.then(function() {
	console.log("all is good...");
}, null, function(result) {
	console.log('I was notified!!!');
	console.log(result);
});

var i = setInterval(function() {
	d.notify("Still deciding...");
}, 500);

setTimeout(function() {
	clearInterval(i);
	d.resolve();
}, 10000);
