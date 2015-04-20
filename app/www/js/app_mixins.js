"use strict";

function extend(d) {

	for (var x=1; x<arguments.length; x++) {
		var s = arguments[x];
		for (var prop in s) {
			if (s.hasOwnProperty(prop)) {
				if (typeof s[prop] === "object"
					&& !(s[prop] instanceof Function)) {
					d[prop] = {};
					extend(d[prop], s[prop]);
				} else {
					d[prop] = s[prop];
				}
			}
		}
	}

}

var destObj = {

};

var baseObj = {
	age: 120
};

var srcObj = Object.create(baseObj);
srcObj.firstName = "Nathan";
srcObj.lastName = "Jones";
srcObj.occupation = "Hot Dog Maker";
srcObj.cookHotDogs = function() {

};
srcObj.address = {
	street: "123 Google Lane",
	state: "TX",
	zipCode: "12345",
	city: "Houston"
}

extend(destObj, srcObj);

console.log(destObj.address === srcObj.address);

console.dir(destObj);

/* bad approach
destObj.firstName = srcObj.firstName;
destObj.lastName = srcObj.lastName;
destObj.occupation = srcObj.occupation;
*/
