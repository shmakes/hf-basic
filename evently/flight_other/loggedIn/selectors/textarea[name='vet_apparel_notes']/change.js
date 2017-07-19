function() {
  var vetId = $(this).parent().parent().attr("vetid");
  var newApparelNotes = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeApparelNotes(app, vetId, newApparelNotes, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_other/loggedIn/selectors/#vetApparelNotes~change.js
