function() {
  var veteran_id1 = $("#veteran_id").attr('value');
  var veteran_id2 = $("#veteran_id2").attr('value');
  if (veteran_id2.length > 0) {
    var target_id = $("input#veteran_id2");
    var target_name = $("input#veteran_name2");
  } else if (veteran_id1.length > 0) {
    var target_id = $("input#veteran_id");
    var target_name = $("input#veteran_name");
  } else {
    return false;
  }
  var target_rev = $("#docrev");

  var vetId = target_id.attr('value');
  if (vetId.length == 32) {
    var grdId = "";
    var user = $("#user_name").text();
    var app = $$(this).app;
    var updateArgs = [ target_id, target_name, target_rev ];

    PairGuardianToVeteran(app, vetId, grdId, user);
  }
  return true;
};

//@ sourceURL=grdedit/loggedIn/selectors/#UnassignVet~click.js
