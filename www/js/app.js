"use strict";

function MyPromise(fn) {

	var resolveFns = [], rejectFns = [];

	fn(function(o) {
		for (var x=0; x<resolveFns.length; x++) {
			resolveFns[x](o);
		}
	}, function(o) {
		for (var x=0; x<rejectFns.length; x++) {
			rejectFns[x](o);
		}
	});

	return {
		then: function(resolveFn, rejectFn) {
			if (resolveFn) resolveFns.push(resolveFn);
			if (rejectFn) rejectFns.push(rejectFn);
			return new Promise(function(resolve, reject) {

			});
		}
	}
}

var p = new MyPromise(function(resolve, reject) {
	setTimeout(function() {
		reject();
	}, 3000);
})
console.log("waiting...");

p.then(function() {
	console.log("resolve: it worked!");

	var p2 = new MyPromise(function(resolve, reject) {
		setTimeout(function() {
			resolve();
		}, 3000);
	})

	return p2;

}, function() {
	console.log("reject: it worked!");
}).then(function() {
	console.log("resolve: it worked too!");
});
