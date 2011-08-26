function() {
  var vetId = $(this).parent().attr("vetid");
  var names = [];
  // Add the veteran name.
  var vetName = $(this).siblings('td[name="vet_name"]').text();
  if (vetName.length > 1) names.push(vetName);
  var grdName = $(this).siblings('td[name="grd_name"]').text();
  if (grdName.length > 1) names.push(grdName);
  $("#vet_name_bus").html(names.join("<br />and<br /> "));    
  var grdId = $(this).parent().attr("grdid");
  $("#vet_id_bus").val(vetId);
  $("#grd_id_bus").val(grdId);

  $("#bus_trigger").click();
  return false;
};



//@ sourceURL=flight_detail/loggedIn/selectors/td#bus~click.js
