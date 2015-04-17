"use strict";

/*
var mapUrl = "https://maps.googleapis.com/maps/api/staticmap?center=" +
	position.coords.latitude + "," + position.coords.longitude +
	"&zoom=11&size=200x200";
*/

function WhereAmI() {

	this.p = new Promise(function(resolve, reject) {

		navigator.geolocation.getCurrentPosition(function(position) {
			resolve(position);
		}, function(err) {
			switch (err.code) {
				case err.PERMISSION_DENIED:
					console.log("permission denied");
					break;
				case err.POSITION_UNAVAILABLE:
					console.log("position unavailable");
					break;
				case err.TIMEOUT:
					console.log("timeout");
					break;
				default:
					console.log("who knows...");
					break;
			}
			reject(err);
		});

	});

}

WhereAmI.prototype.myCurrentPosition = function() {

	return this.p;

};

Object.defineProperty(WhereAmI.prototype, "currentPosition", {
	configurable: false,
	enumerable: true,
	get: function() {
		return this.p;
	}
})

window.addEventListener("DOMContentLoaded", function() {

	var w = new WhereAmI();
	w.currentPosition.then(function(position) {
		console.log(position.coords.longitude);
		console.log(position.coords.latitude);
	}, function(err) {
		console.log("did not work out...");
	});

});
