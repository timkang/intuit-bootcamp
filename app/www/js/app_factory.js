function WalkWithMyFeet() {
	return {
		go: function() {
			console.log("walking");
		}
	};
}

function DriveMyCar() {
	this.go = function() {
			console.log("driving");
	};
}

function RideBlueBicycle() {
	this.go = function() {
			console.log("riding");
	};
}

function StealAMultiColoredGoogleBike() {
	this.go = function() {
			console.log("riding");
	};
}



function myFactory(methodOfTransport) {

	switch(methodOfTransport) {
		case "walk":
			return WalkWithMyFeet(); // invoking
		case "drive":
			return new DriveMyCar(); // instantiating
		case "ride":
			return RideBlueBicycle();
		case "steal":
			return {
				go: function() {
					console.log("riding");
				}
			};
	}

}

var transport = myFactory("steal");

console.dir(transport);

transport.go();
