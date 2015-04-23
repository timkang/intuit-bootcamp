window.addEventListener("DOMContentLoaded", function() {

	var buttonElement = document.getElementById("myButton");

	var clickFn1 = function() {
		console.log("I was clicked! 1");
	};
	var clickFn2 = function() {
		console.log("I was clicked! 2");
	};

	buttonElement.addEventListener("click", clickFn1);
	buttonElement.addEventListener("click", clickFn2);
	buttonElement.addEventListener("click", function() {
		console.log("I was clicked!");
	});
	buttonElement.addEventListener("click", function() {
		console.log("I was clicked!");
	});

	buttonElement.onclick = clickFn1;
	//buttonElement.onclick = clickFn2;

	//buttonElement.removeEventListener("click", clickFn);

});
