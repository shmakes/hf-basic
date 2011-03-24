// $.couch.app() loads the design document from the server and 
// then calls our application.
$.couch.app(function(app) {  
  $("#vets").evently("vets", app);
  $.evently.connect($("#account"), $("#vets"), ["loggedIn", "loggedOut"]);

});

