function() {
  var app = $$(this).app;
  var vetId = $("#vet_id").val();
  var grdIdNew = $("select#SelectByAppDate").val();
  var user = $("#user_name").text();

  var results = PairGuardianToVeteran(app, vetId, grdIdNew, user);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByAppDateSubmit~click.js
