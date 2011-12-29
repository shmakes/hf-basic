function() {
  var app = $$(this).app;
  var user = $("#user_name").text();
  var range = parseInt($("input:radio[name=range]:checked").val(), 10);
  var start = 1 + range;
  var end = 100 + range;

  $("#description").text("List for Guardians " + start + " to " + end);

  return true;
};

//@ sourceURL=waitlist/loggedIn/selectors/#showGrds~click.js
