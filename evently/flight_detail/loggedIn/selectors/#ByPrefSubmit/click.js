function() {
  var vetId = $("#vet_id").val();
  var vetName = $("#vet_name")[0].textContent;
  var grdId = $("select#SelectByPref").val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  var results = PairGuardianToVeteran(app, vetId, vetName, grdId, user);

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByPrefSubmit/click.js
