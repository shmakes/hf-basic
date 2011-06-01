function() {
  var vetId = $("#vet_id").val();
  var vetName = $("#vet_name")[0].textContent;
  var grdIdOld = $("#grd_id").val();
  var grdIdNew = $("select#SelectByCity").val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  var results = PairGuardianToVeteran(app, vetId, vetName, grdIdOld, grdIdNew, user);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByCitySubmit~click.js
