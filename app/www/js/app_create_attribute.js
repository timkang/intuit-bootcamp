var domElement = document.getElementsByTagName("p")[0];

var attr = document.createAttribute("id");
attr.value = "test";

domElement.setAttributeNode(attr);

console.dir(document.getElementById("test"));
