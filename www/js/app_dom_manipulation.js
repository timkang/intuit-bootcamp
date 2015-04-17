
var pElement = document.getElementById("first-box")
	.getElementsByTagName("p")[0];

var buttonElement = document.getElementById("contentSwitchButton");

buttonElement.addEventListener("click", function() {
	console.log("replacing element");

	if (pElement.placeHolderNode) {
		pElement.placeHolderNode
			.parentNode.replaceChild(pElement, pElement.placeHolderNode);
			delete pElement.placeHolderNode;
	} else {
		console.log(pElement.outerHTML);
		pElement.placeHolderNode = document.createComment("Place Holder");
		pElement.parentNode.replaceChild(pElement.placeHolderNode, pElement);
	}

});



/*
var parentElement = pElement.parentNode;

console.time("add nodes");
/*
pElement.remove();
for (var x=0; x<1000000; x++) {
	var textNode = document.createTextNode("Some Node Awesomeness!");
	var spanElement = document.createElement("span");
	spanElement.appendChild(textNode);
	pElement.appendChild(spanElement);
}
parentElement.appendChild(pElement);
var s = [];
for (var x=0; x<1000000; x++) {
	s.push("<span>Some Node Awesomeness!</span>");
}
pElement.innerHTML = s.join("");

pElement.appendChild(commentNode);

console.timeEnd("add nodes");
*/
