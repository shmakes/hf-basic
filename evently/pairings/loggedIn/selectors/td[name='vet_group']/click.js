function() {
  var vetId = $(this).parent().attr("vetid");
  if (vetId.length == 32) {
    // Add the veteran name.
    $("#vet_name_group")[0].textContent = $(this).siblings()[1].textContent;    
    var grdId = $(this).parent().attr("grdid");
    $("#vet_id").val(vetId);
    $("#grd_id").val(grdId);

    $("#group_trigger").click();
  }
  return false;
};



//@ sourceURL=flight_detail/loggedIn/selectors/td#vet_group~click.js
