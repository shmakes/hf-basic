$.couch.app(function(app) {  
  $("#presenters").evently("presenters", app);
  $.evently.connect($("#account"), $("#presenters"), ["loggedIn", "loggedOut"]);
});

