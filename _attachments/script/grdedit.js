$.couch.app(function(app) {  
  $("#grdedit").evently("grdedit", app);
  $.evently.connect($("#account"), $("#grdedit"), ["loggedIn", "loggedOut"]);
});

