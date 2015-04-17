"use strict";

var d = Q.defer();

d.promise.then(function() {

	console.log("resolved 1...");

}).then(function() {

	console.log("resolved 2...");

	throw Error("world is ending...");

}).then(function() {

	console.log("resolved 3...");

}).catch(function(err) {
	console.log("error...");

}).finally(function() {

	console.log("finally...");

});

setTimeout(function() {
	d.resolve();
}, 2000);
