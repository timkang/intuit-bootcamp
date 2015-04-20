
self.addEventListener("message", function(msg) {

	var y = 0;
	for (var x=0; x<10000000000; x++) {
		y = x
	}

	self.postMessage(msg.data);

});
