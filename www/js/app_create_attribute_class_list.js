var divElement = document.getElementsByTagName("div")[0];

var attr = document.createAttribute("id");
attr.value = "myDiv";

divElement.setAttributeNode(attr);

divElement = document.getElementById("myDiv");
console.dir(divElement);

divElement.classList.add("container");
