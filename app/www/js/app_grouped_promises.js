"use strict";

var
	d1 = Q.defer(),
	d2 = Q.defer(),
	d3 = Q.defer(),
	d4 = Q.defer();

	var p5 = d1.promise.then(function() {
		console.log("another then...");
	}).then(function() {
		console.log("another then 2...");
		return "5";
	});

Q.all([p5, d2.promise, d3.promise, d4.promise])
	.then(function() {
		console.log("all resolved");
		console.log(arguments);
	}, function() {
		console.log("one rejected");
		console.log(arguments);
	}).then(function() {
		
	});

	setTimeout(function() {
		console.log("d1 resolved");
		d1.resolve("1");
	}, 2000);

	setTimeout(function() {
		console.log("d2 resolved");
		d2.resolve("2");
	}, 4000);

	setTimeout(function() {
		console.log("d3 rejected");
		d3.reject("3");
	}, 6000);

	setTimeout(function() {
		console.log("d4 resolved");
		d4.resolve("4");
	}, 8000);

	console.log("waiting to resolve...");
