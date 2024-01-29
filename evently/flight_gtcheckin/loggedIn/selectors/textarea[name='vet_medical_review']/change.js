function() {
  var vetId = $(this).parent().parent().attr("vetid");
  var newMedicalNotes = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeMedicalNotes(app, vetId, newMedicalNotes, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_gtcheckin/loggedIn/selectors/#vetMedicalNotes~change.js
