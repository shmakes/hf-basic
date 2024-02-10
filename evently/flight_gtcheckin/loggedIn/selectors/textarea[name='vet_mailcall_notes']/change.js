function() {
  var vetId = $(this).parent().parent().attr("vetid");
  var newMailCallNotes = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeMailCallNotes(app, vetId, newMailCallNotes, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_gtcheckin/loggedIn/selectors/#vetMailCallNotes~change.js
