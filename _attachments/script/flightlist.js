$.couch.app(function(app) {  
  $("#flights").evently("flights", app);
  $.evently.connect($("#account"), $("#flights"), ["loggedIn", "loggedOut"]);
});

