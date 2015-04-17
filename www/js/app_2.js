
document.addEventListener("DOMContentLoaded", function() {
	console.log("run");

});

var b = document.createElement("button");
b.addEventListener("click", function() {
	console.log("clicked!");
});

var f = [];

function start()
{
  var p = document.getElementById("p");
  detached = document.createElement("div");
  p.appendChild(detached);
  p.removeChild(detached);
  fill();
}

function fill()
{
  for (var i = 0; i < 25; ++i) {
    var div = document.createElement('div');
    div.data = new Array(10000);
    for (var j = 0, l = div.data.length; j < l; ++j)
      div.data[j] = j.toString();
    detached.appendChild(div);
  }
}

function Item(x)
{
  this.x = x;
}

function numbers()
{
  var result = new Array(10000);
  for (var i = 0, l = result.length; i < l; ++i)
    result[i] = new Item(i);
  return new Item(result);
}

function strings()
{
  var result = new Array(10000);
  for (var i = 0, l = result.length; i < l; ++i)
    result[i] = new Item(i.toString());
  return new Item(result);
}

function init()
{
  numberCache = numbers();
  stringCache = strings();
  documentCache = new Item(document.body.textContent.toLowerCase());
}
