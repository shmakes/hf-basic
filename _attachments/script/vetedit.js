$.couch.app(function(app) {  
  $("#vetedit").evently("vetedit", app);
  $.evently.connect($("#account"), $("#vetedit"), ["loggedIn", "loggedOut"]);
});

