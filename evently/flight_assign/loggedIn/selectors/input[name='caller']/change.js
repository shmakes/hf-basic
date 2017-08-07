function() {
  var docId = $(this).parent().parent().attr("id");
  var newCaller = $(this).val().replace('"', '').replace("\\", "").trim();
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeCaller(app, docId, newCaller, user);
  return false;
};

//@ sourceURL=flight_assign/loggedIn/selectors/caller~change.js
