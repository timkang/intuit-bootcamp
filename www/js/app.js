"use strict";

function MyPromise(fn) {

	var
		resolveFns = [],
		rejectFns = [];
	var
		nextResolveFn = function() {},
		nextRejectFn = function() {};

	fn(function(o) {
		for (var x=0; x<resolveFns.length; x++) {
			var r = resolveFns[x](o);
			if (!(r instanceof MyPromise)) {
				nextResolveFn(r);
			} else {
				resolveFns[x](o).then(nextResolveFn, nextRejectFn);
			}
		}
	}, function(o) {
		for (var x=0; x<rejectFns.length; x++) {
			var r = rejectFns[x](o);
			if (!(r instanceof MyPromise)) {
				nextResolveFn(r);
			} else {
				rejectFns[x](o).then(nextResolveFn, nextRejectFn);
			}
		}
	});

	return {
		then: function(resolveFn, rejectFn) {
			if (resolveFn) resolveFns.push(resolveFn);
			if (rejectFn) rejectFns.push(rejectFn);
			return new Promise(function(resolve, reject) {
				nextResolveFn = resolve;
				nextRejectFn = reject;
			});
		}
	}
}

var p = new MyPromise(function(resolve, reject) {
	setTimeout(function() {
		resolve();
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
