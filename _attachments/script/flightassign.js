$.couch.app(function(app) {  
  $("#flight_assign").evently("flight_assign", app);
  $.evently.connect($("#account"), $("#flight_assign"), ["loggedIn", "loggedOut"]);
});

function UpdateGuardianDataGrid(vetId, grd) {
  // Update the grid.
  var vetRow = $("tr.DataRow[vetid='" + vetId + "']");
  var vetData = vetRow.children("td");
  vetData[13].textContent = (grd.name ? (grd.name.first + " " + grd.name.last) : "");
  vetData[12].textContent = (grd.address ? (grd.address.city + ", " + grd.address.state) : "");
  vetData[11].textContent = (grd.address ? grd.app_date : "");
  vetData[10].textContent = (grd.veteran ? grd.veteran.pref_notes : "");
  vetData[9].textContent  = (grd.flight ? grd.flight.bus : "");
  vetData[8].children("input").val(grd.flight.seat);
}

