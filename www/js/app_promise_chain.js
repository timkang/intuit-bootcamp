"use strict";

var
	youngLady = Q.defer(),
	youngMan = youngLady.promise;

youngMan.then(function() {
	var d1 = Q.defer();
	setTimeout(function() {
		d1.resolve();
	}, 5000);
	return d1.promise;
}).then(function() {
});

youngMan.then(function(msg) {
	console.log(msg);
	console.log("she said yes!");
	//throw Error("the world ended...");
	return Q.reject("so sad...");
}).then(function(msg) {
	console.log(msg);
	console.log("next promise resolved");
},function(result) {
	console.log(result);
	console.log("next promise rejected");
});

setTimeout(function() {
	youngLady.resolve("You are the only one!");
}, 2000);
console.log("young man is waiting...");
