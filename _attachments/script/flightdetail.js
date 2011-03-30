$.couch.app(function(app) {  
  $("#flight_detail").evently("flight_detail", app);
  $.evently.connect($("#account"), $("#flight_detail"), ["loggedIn", "loggedOut"]);
});

