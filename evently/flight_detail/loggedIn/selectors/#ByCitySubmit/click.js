function() {
  var app = $$(this).app;
  var vetId = $("#vet_id").val();
  var grdIdNew = $("select#SelectByCity").val();
  var user = $("#user_name").text();

  PairGuardianToVeteran(app, vetId, grdIdNew, user, UpdateGuardianDataGrid, null);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByCitySubmit~click.js
