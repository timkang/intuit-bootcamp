var module = (function() {

	var _name = "";

	function uppercaseName() {
		return String(name).toUpperCase();
	}

	var o = {};

	Object.defineProperty(o, "name", {
		configurable: false,
		enumerable: true,
		get: function() {
			console.log("get name: " + _name);
			return _name;
		},
		set: function(value) {
			_name = String(value);
			console.log("set name: " + _name);
		}
	})

	return o;

})();

console.dir(module);

module.name = "Johnny";
console.log(module.name);
