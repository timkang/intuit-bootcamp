(function() {

	function myFunc() {

		console.trace();
		console.count("myFunc");

	}

	console.time("test");

	y = 1000;
	while(y--) {
			var o = [];
	}

	console.timeEnd("test");

	myFunc();
	console.groupCollapsed("A group");
	myFunc();
	console.groupEnd();
	myFunc();

	console.assert(false, "it was false");

	console.log("%o", {
		name: "Eric"
	});

	for (var i=0; i<5; i++) {
  	console.log("Hello, %s. You've called me %d times.", "Bob", i+1);
  }

	console.log("%cMy stylish message", "color: red; font-style: italic");


}());
