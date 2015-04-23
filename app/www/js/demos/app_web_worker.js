"use strict";

var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var workerBees = [];

startButton.addEventListener("click", function() {

	for (var x=0; x<10; x++) {
		let w = new Worker("js/worker.js");
		w.addEventListener("message", function() {
			console.dir(arguments);
		});
		w.postMessage({
			msg: "Intuit!"
		});
		workerBees.push(w);
	}



});

stopButton.addEventListener("click", function() {
	for (var x=0; x<workerBees.length; x++) {
		let w = workerBees[x];
		w.terminate();
		w = undefined;
	}
});
