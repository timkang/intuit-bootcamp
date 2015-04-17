"use strict";

var calc = {
	currentValue: 0,
	add: function(value) {
		this.currentValue += value;
		return this;
	},
	subtract: function(value) {
		this.currentValue -= value;
		return this;
	},
	multiply: function(value) {
		this.currentValue *= value;
		return this;
	},
	divide: function(value) {
		this.currentValue /= value;
		return this;
	},
	print: function() {
		console.log(this.currentValue);
		return this;
	}
}

calc.add(10).subtract(3).print().multiply(2).print().divide(7).print();
