var o = {};

Object.defineProperty(o, "name", {
	configurable: true,
	enumerable: true,
	get: function() {
		console.log("get name");
		return this._name;
	},
	set: function(name) {
		console.log("set name");
		this._name = name;
	}
});

o.name = "Bob";

function getPerson() {

	var _title = "";

	return {
		get title() {
			console.log("get title");
			return _title;
		},
		set title(value) {
			console.log("set title");
			_title = value;
		}
	};
}

o = getPerson();

o.title = "Janitor";

//console.log(o.name);
console.dir(o);
