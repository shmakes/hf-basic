function() {
  var vetId = $(this).parent().parent().attr("vetid");
  var newSeat = $(this).val().replace('"', '').replace("\\", "");
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeSeat(app, vetId, newSeat, user);
  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#vetSeat~change.js
