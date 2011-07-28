$.couch.app(function(app) {  
  $("#flight_detail").evently("flight_detail", app);
  $.evently.connect($("#account"), $("#flight_detail"), ["loggedIn", "loggedOut"]);
});

function UpdateGuardianDataGrid(vet, grd, args) {
  // Update the grid.
  var vetRow = $("tr.DataRow[vetid='" + vet._id + "']");
  var vetData = vetRow.children("td");
  if (grd.name) {
    vetData[10].textContent = grd.name.first + " " + grd.name.last;
    vetData[9].textContent = grd.address.city + ", " + grd.address.state;
    vetData[8].textContent = grd.medical.experience;
    vetData[7].textContent  = grd.flight.bus;
    vetData[6].firstChild.value = grd.flight.seat;
  } else {
    vetData[10].textContent = "";
    vetData[9].textContent = "";
    vetData[8].textContent = "";
    vetData[7].textContent  = "";
    vetData[6].firstChild.value = "";
  }
}

