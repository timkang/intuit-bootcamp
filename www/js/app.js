"use strict";

window.addEventListener("DOMContentLoaded", function() {

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		console.log("ready state: " + xhr.readyState);
		console.log("status: " + xhr.status);
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.dir(xhr);
			var o = JSON.parse(xhr.responseText)
			console.log(o);
		}
	};
	xhr.open("POST", "/uploads");
	xhr.send();

});

// using the above code and promises, please create
// an ajax method with the following method signature
ajax(httpMethod, httpUrl).then(function(result) {
	ready state 4 and status 200
}, function(err) {
	if status != 200 on any ready state except 1
});
