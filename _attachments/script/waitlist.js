$.couch.app(function(app) {  
  $("#waitlist").evently("waitlist", app);
  $.evently.connect($("#account"), $("#waitlist"), ["loggedIn", "loggedOut"]);
});
