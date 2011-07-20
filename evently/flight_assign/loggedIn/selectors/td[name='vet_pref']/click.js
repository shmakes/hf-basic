function() {
  var vetId = $(this).parent().attr("vetid");
  if (vetId.length == 32) {
    // Add the veteran name.
    $("#vet_name_pref")[0].textContent = $(this).siblings()[1].textContent;    
    var pref = $(this);    
    $("#pref_notes")[0].textContent = $(this)[0].textContent;    
    var grdId = $(this).parent().attr("grdid");
    $("#vet_id_pref").val(vetId);
    $("#grd_id_pref").val(grdId);

    var lastnameInput = $("input#last_name_search");
    lastnameInput.val("");
    
    var lastnameSel = $("select#SelectByLastNameSearch");
    lastnameSel.find('option').remove().end();

    $("#pref_trigger").click();
    lastnameInput.focus();
  }
  return false;
};



//@ sourceURL=flight_detail/loggedIn/selectors/td#vet_pref~click.js
