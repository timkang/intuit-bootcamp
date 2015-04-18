"use strict";

var p = new Promise(function(resolve, reject) {

	console.log("promise 1");

	setTimeout(function() {
		resolve({
			x:1, y:2
		});
	}, 6000);

});

p.then(function(o) {

	console.log("promise 2 " + o.x + " " + o.y);

	return Promise.reject("a");
	return new Promise(function(resolve, reject) {


		setTimeout(function() {
			resolve();
		}, 6000);

	});

}, function(o) {

	setTimeout(function() {
		console.log("reject " + o.x + " " + o.y);
	}, 2000);

}).then(function() {
	console.log("another promise...");
}, function() {
	console.log("another broken promise...");
});
