function() {
  var grdId = $(this).parent().parent().attr("grdid");
  var newApparelNotes = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeApparelNotes(app, grdId, newApparelNotes, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_other/loggedIn/selectors/#grdApparelNotes~change.js
