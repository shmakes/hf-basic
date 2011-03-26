// $.couch.app() loads the design document from the server and 
// then calls our application.
$.couch.app(function(app) {  
  $("#flights").evently("flights", app);
  $.evently.connect($("#account"), $("#flights"), ["loggedIn", "loggedOut"]);

});

