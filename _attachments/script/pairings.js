$.couch.app(function(app) {  
  $("#pairings").evently("pairings", app);
  $.evently.connect($("#account"), $("#pairings"), ["loggedIn", "loggedOut"]);
});

function UpdateGuardianDataGrid(vetId, grd) {
  // Update the grid.
  var vetRow = $("tr.DataRow[vetid='" + vetId + "']");
  var vetData = vetRow.children("td");
  vetData[12].textContent = (grd.name ? (grd.name.first + " " + grd.name.last) : "");
  vetData[11].textContent = (grd.address ? (grd.address.city + ", " + grd.address.state) : "");
  vetData[10].textContent = (grd.address ? grd.app_date : "");
  vetData[9].textContent = (grd.veteran ? grd.veteran.pref_notes : "");
  vetData[8].textContent  = (grd.flight ? grd.flight.bus : "");
  //vetData[7].children("input").val("2"); //grd.flight.seat);
}

function PairGuardianToVeteran(app, vetId, vetName, grdIdOld, grdIdNew, user) {
  var timestamp = ISODateString(new Date());

  app.db.openDoc(vetId, {
    success : function(vetdoc) {
      // Check if the old guardian is the one the vet referenced.
      if (grdIdOld === vetdoc.guardian.id) {
        // If an old guardian exists, unpair and log.
        if (vetdoc.guardian.id.length === 32) {
          app.db.openDoc(vetdoc.guardian.id, {
            success : function(oldgrd) {
              if (oldgrd.veteran.id === vetdoc._id) {
                oldgrd.veteran.history.push({
                  id: timestamp,
                  change: "unpaired from: " + vetName + " by: " + user
                });
                oldgrd.veteran.id = "";
                oldgrd.veteran.name = "";
                oldgrd.flight.history.push({
                  id: timestamp,
                  change: "removed from flight: " + oldgrd.flight.id + " by: " + user
                });
                oldgrd.flight.id = "None";
                oldgrd.flight.bus = "None";
                oldgrd.flight.seat = "";

                app.db.saveDoc(oldgrd, {
                  success : function() {
                  }
                });
              }
            }
          });
        }
      } else {
        // Remove pairing in the unmatched old guardian.
        if (grdIdOld.length === 32) {
          app.db.openDoc(grdIdOld, {
            success : function(oldgrd) {
              if (oldgrd.veteran.id === vetdoc._id) {
                oldgrd.veteran.history.push({
                  id: timestamp,
                  change: "unpaired from: " + vetName + " by: " + user
                });
                oldgrd.veteran.id = "";
                oldgrd.veteran.name = "";
                oldgrd.flight.history.push({
                  id: timestamp,
                  change: "removed from flight: " + oldgrd.flight.id + " by: " + user
                });
                oldgrd.flight.id = "None";
                oldgrd.flight.bus = "None";
                oldgrd.flight.seat = "";

                app.db.saveDoc(oldgrd, {
                  success : function() {
                  }
                });
              }
            }
          });
        }
      }
      // Get the new guardian.
      if (grdIdNew.length === 32) {
        app.db.openDoc(grdIdNew, {
          success : function(newgrd) {
            newgrd.veteran.history.push({
              id: timestamp,
              change: "paired to: " + vetName + " by: " + user
            });
            newgrd.veteran.id = vetdoc._id;
            newgrd.veteran.name = vetName;
            newgrd.flight.history.push({
              id: timestamp,
              change: "added to flight: " + vetdoc.flight.id + " and bus: " + vetdoc.flight.bus + " by: " + user
            });
            newgrd.flight.id = vetdoc.flight.id;
            newgrd.flight.bus = vetdoc.flight.bus;
            newgrd.flight.seat = "";

            app.db.saveDoc(newgrd, {
              success : function() {
              }
            });

            // Update veteran history.
            grdName = newgrd.name.first + " " + newgrd.name.last;
            vetdoc.guardian.history.push({
              id: timestamp,
              change: "paired to: " + grdName + " by: " + user
            });
            vetdoc.guardian.id = newgrd._id;
            vetdoc.guardian.name = grdName;

            app.db.saveDoc(vetdoc, {
              success : function() {
              }
            });

            UpdateGuardianDataGrid(vetId, newgrd);

          }
        });
      } else {
            // Update veteran history.
            vetdoc.guardian.history.push({
              id: timestamp,
              change: "unpaired from: " + vetdoc.guardian.name + " by: " + user
            });
            vetdoc.guardian.id = "";
            vetdoc.guardian.name = "";

            app.db.saveDoc(vetdoc, {
              success : function() {
              }
            });

            UpdateGuardianDataGrid(vetId, {});

      }
    }
  });
}

