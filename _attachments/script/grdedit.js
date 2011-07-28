$.couch.app(function(app) {  
  $("#grdedit").evently("grdedit", app);
  $.evently.connect($("#account"), $("#grdedit"), ["loggedIn", "loggedOut"]);
});

function UpdateVeteranLinks() {
  var vetId = $("#veteran_id");
  if (vetId.attr('value').length == 0) {
    $("#vet_edit_link").hide();
  } else {
    $("#vet_edit_link").show();
  }

  var vetId2 = $("#veteran_id2");
  if (vetId2.attr('value').length == 0) {
    $("#vet_edit_link2").hide();
  } else {
    $("#vet_edit_link2").show();
  }
}

function UpdateGuardianPairingFields(vet, grd, args) {
  //window.location.reload();
}
