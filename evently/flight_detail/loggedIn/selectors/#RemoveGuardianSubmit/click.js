function() {
  var app = $$(this).app;
  var vetId = $("#vet_id").val();
  var grdIdNew = "";
  var user = $("#user_name").text();

  PairGuardianToVeteran(app, vetId, grdIdNew, user, UpdateGuardianDataGrid, null);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#RemoveGuardianSubmit~click.js
