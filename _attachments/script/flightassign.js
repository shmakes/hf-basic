$.couch.app(function(app) {  
  $("#flight_assign").evently("flight_assign", app);
  $.evently.connect($("#account"), $("#flight_assign"), ["loggedIn", "loggedOut"]);
});
