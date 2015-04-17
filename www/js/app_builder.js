"use strict";

var stringBuilder = {
	buffer: [],
	appendString: function(stringToAppend) {
		this.buffer.push(stringToAppend);
		return this;
	},
	toString: function() {
		return this.buffer.join("");
	}
}
console.log(
stringBuilder
  .appendString("Steve ")
  .appendString("Jobs ")
	.appendString("Rocks!")
	.toString()
);
