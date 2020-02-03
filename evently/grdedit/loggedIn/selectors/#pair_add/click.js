function() {
  ByLastNameAssign
  $("#ByLastNameAssign").prop('disabled', false)  
  var guardian_id = $("input[name='_id']").attr('value');
  if (guardian_id.length === 32) {
    var veteran_id1 = $("#veteran_id").attr('value');
    var veteran_id2 = $("#veteran_id2").attr('value');
    if ((veteran_id1.length > 0) && (veteran_id2.length > 0) && (veteran_id3.length > 0)) {
      return false;
    }

    var lastnameInput = $("input#last_name_search");
    lastnameInput.val("");
    
    var lastnameSel = $("select#SelectByLastNameSearch");
    lastnameSel.find('option').remove().end();

    $("#pair_trigger").click();
    lastnameInput.focus();
  }
  return false;
};

//@ sourceURL=grdedit/loggedIn/selectors/#pair_add~click.js
