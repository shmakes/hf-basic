function() {
  var grdId = $(this).parent().parent().attr("grdid");
  var newSeat = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeSeat(app, grdId, newSeat, user);
  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#grdSeat~change.js
