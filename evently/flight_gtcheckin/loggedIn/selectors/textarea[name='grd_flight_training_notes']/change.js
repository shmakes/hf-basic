function() {
  var grdId = $(this).parent().parent().attr("grdid");
  var newFlightTrainingNotes = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeFlightTrainingNotes(app, grdId, newFlightTrainingNotes, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_gtcheckin/loggedIn/selectors/#grdFlightTrainingNotes~change.js
