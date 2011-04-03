function() {
  var vetId = $("#vet_id").val();
  var grdId = $("select#SelectByCity").val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  //var results = PairGuardianToVeteran(app, vetId, vetName, grdId, user);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByCitySubmit/click.js
