"use strict";

var redBox = document.getElementById("red-box");
var blueBox = document.getElementById("blue-box");

redBox.addEventListener("dragstart", function(e) {
	e.dataTransfer.setData("dragElementId", e.target.id);
});

blueBox.addEventListener("dragover", function(e) {
	e.preventDefault();
});

blueBox.addEventListener("drop", function(e) {
	//e.preventDefault();

	console.dir(e.dataTransfer);

	var dragElement = document.getElementById(e.dataTransfer.getData("dragElementId"));
	var dropElement = document.getElementById(e.target.id);

	dropElement.appendChild(dragElement);
});
