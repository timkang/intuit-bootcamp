"use strict";

function MySingleton() {

	var obj;

	if (!MySingleton.singleton) {
		Object.defineProperty(MySingleton, "singleton", {
			configurable: false,
			enumerable: false,
			writable: false,
			value: {
				name: "Bob"
			}
		});
	}

	return MySingleton.singleton;

}

var mySingleton = MySingleton();
console.log(mySingleton.name);
mySingleton.name = "Sarah";
var mySingleton2 = MySingleton();
console.log(mySingleton.name);
console.log(mySingleton2.name);

MySingleton.singleton = {
	name: "Tonya"
};
