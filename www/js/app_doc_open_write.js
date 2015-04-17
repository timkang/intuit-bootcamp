

document.writeln("<p>page load!!!</p>");

window.addEventListener("XDOMContentLoaded", function() {

//var w = window.open("#");

document.open();
document.writeln("<p>some text!!!</p>");
document.close();

});
