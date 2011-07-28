function() {
  var app = $$(this).app;
  var vetId = $("#vet_id").val();
  var grdIdNew = $("select#SelectByCounty").val();
  var user = $("#user_name").text();

  PairGuardianToVeteran(app, vetId, grdIdNew, user);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByCountySubmit~click.js
