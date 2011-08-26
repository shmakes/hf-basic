$.couch.app(function(app) {  
  $("#flight_detail").evently("flight_detail", app);
  $.evently.connect($("#account"), $("#flight_detail"), ["loggedIn", "loggedOut"]);
});

function UpdateGuardianDataGrid(vetId, grd) {
  // Update the grid.
  var vetRow = $("tr.DataRow[vetid='" + vetId + "']");
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

function PairGuardianToVeteran(app, vetId, grdIdNew, user) {
  var timestamp = ISODateString(new Date());
  var grdIdOld;
  var vetName;

  app.db.openDoc(vetId, {
    success : function(vetdoc) {
      vetName = vetdoc.name.first + " " + vetdoc.name.last;
      grdIdOld = vetdoc.guardian.id;

      // If an old guardian exists, unpair and log.
      if (grdIdOld.length === 32) {
        app.db.openDoc(grdIdOld, {
          success : function(oldgrd) {
            for (vetIdx in oldgrd.veteran.pairings) {
              if (oldgrd.veteran.pairings[vetIdx].id === vetId) {
                oldgrd.veteran.history.push({
                  id: timestamp,
                  change: "unpaired from: " + vetName + " by: " + user
                });
                oldgrd.metadata.updated_at = timestamp;
                oldgrd.metadata.updated_by = user;

                oldgrd.veteran.pairings.splice(vetIdx, 1);
                app.db.saveDoc(oldgrd, {
                  success : function() {}
                });
                break;
              }
            }
          }
        });
      }

      // Get the new guardian.
      if (grdIdNew.length === 32) {
        app.db.openDoc(grdIdNew, {
          success : function(newgrd) {
            newgrd.veteran.history.push({
              id: timestamp,
              change: "paired to: " + vetName + " by: " + user
            });
            newgrd.veteran.pairings.push({
              id: vetId,
              name: vetName
            });
            newgrd.metadata.updated_at = timestamp;
            newgrd.metadata.updated_by = user;

            app.db.saveDoc(newgrd, {
              success : function() {}
            });

            // Update veteran history.
            grdName = newgrd.name.first + " " + newgrd.name.last;
            vetdoc.guardian.history.push({
              id: timestamp,
              change: "paired to: " + grdName + " by: " + user
            });
            vetdoc.guardian.id = grdIdNew;
            vetdoc.guardian.name = grdName;
            vetdoc.metadata.updated_at = timestamp;
            vetdoc.metadata.updated_by = user;

            app.db.saveDoc(vetdoc, {
              success : function() {}
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
            vetdoc.metadata.updated_at = timestamp;
            vetdoc.metadata.updated_by = user;

            app.db.saveDoc(vetdoc, {
              success : function() {
              }
            });
            UpdateGuardianDataGrid(vetId, {});
      }
    }
  });
}

function assignToBus(app, docId, newBus, user) {
  app.db.openDoc(docId, {
    success : function(doc) {
      if ((doc.flight) && (doc.flight.bus)) {
        if (doc.flight.history) {
          doc.flight.history.push({
            id: ISODateString(new Date()),
            change: "changed bus from: " + doc.flight.bus + " to: " + newBus + " by: " + user
          });
        }
        doc.flight.bus = newBus;
        app.db.saveDoc(doc, {
          success : function() {}
        });
      }
    }
  });
}
