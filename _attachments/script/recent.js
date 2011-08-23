$.couch.app(function(app) {  
  $("#recent").evently("recent", app);
  $.evently.connect($("#account"), $("#recent"), ["loggedIn", "loggedOut"]);
});
