function() {
  var veteran_id1 = $("#veteran_id").attr('value');
  var veteran_id2 = $("#veteran_id2").attr('value');
  if (veteran_id1.length == 0) {
    var target_id = $("input#veteran_id");
    var target_name = $("input#veteran_name");
  } else if (veteran_id2.length == 0) {
    var target_id = $("input#veteran_id2");
    var target_name = $("input#veteran_name2");
  } else {
    return false;
  }

  var vetId = $("select#SelectByLastNameSearch").val();
  if (vetId.length == 32) {
    var grdId = $("input[name='_id']").attr('value');
    var user = $("#user_name").text();
    var app = $$(this).app;

    //var results = PairGuardianToVeteran(app, vetId, grdIdNew, user);

    target_name[0].value = "insert here";
  }
  return true;
};

//@ sourceURL=grdedit/loggedIn/selectors/#ByLastNameAssign~click.js
