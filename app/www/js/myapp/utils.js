define(["dojo/dom", "dojo/dom-style"],
	function(dom, domStyle) {

		return {

			boldMe: function(domElement) {

				if (!(domElement instanceof HTMLElement)) {

					domElement = dom.byId(domElement);
					//console.dir(domElement);

				}

				domStyle.set(domElement, "font-weight", "bold");


			}

		};


		return function() {

		};

});
