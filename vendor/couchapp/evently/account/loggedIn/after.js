function() {
  var pathname = window.location.pathname;
  if (pathname.indexOf("/test/_design") != -1) {
    var header = $("#header");
    header.css("background-color", "yellow");
    var txt = header.children("h1");
    txt.text(txt.text() + " (Test Database!)");
  }
};

//@ sourceURL=/account/loggedIn/after.js
