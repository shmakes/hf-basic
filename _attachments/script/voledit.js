$.couch.app(function(app) {  
  $("#voledit").evently("voledit", app);
  $.evently.connect($("#account"), $("#voledit"), ["loggedIn", "loggedOut"]);
});

