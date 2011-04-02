$.couch.app(function(app) {  
  $("#flight_detail").evently("flight_detail", app);
  $.evently.connect($("#account"), $("#flight_detail"), ["loggedIn", "loggedOut"]);
});

function UpdateGuardianDataGrid(vetId, grd) {
  // Update the grid.
  var vetRow = $("tr.DataRow[vetid='" + vetId + "']");
  var vetData = vetRow.children("td");
  vetData[13].textContent = grd.name.first + " " + grd.name.last;
  vetData[12].textContent = grd.address.city + ", " + grd.address.state;
  vetData[11].textContent = grd.app_date;
  vetData[10].textContent = grd.veteran.pref_notes;
  vetData[9].textContent  = grd.flight.group;
  vetData[8].children("input").val(grd.flight.seat);
}

function PairGuardianToVeteran(app, vetId, vetName, grdId, user) {
  var timestamp = ISODateString(new Date());

  app.db.openDoc(vetId, {
    success : function(vetdoc) {
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
              oldgrd.flight.group = "None";
              oldgrd.flight.seat = "";

              app.db.saveDoc(oldgrd, {
                success : function() {
                }
              });
            }
          }
        });
      }
      // Get the new guardian.
      app.db.openDoc(grdId, {
        success : function(newgrd) {
          newgrd.veteran.history.push({
            id: timestamp,
            change: "paired to: " + vetName + " by: " + user
          });
          newgrd.veteran.id = vetdoc._id;
          newgrd.veteran.name = vetName;
          newgrd.flight.history.push({
            id: timestamp,
            change: "added to flight: " + vetdoc.flight.id + " and group: " + vetdoc.flight.group + " by: " + user
          });
          newgrd.flight.id = vetdoc.flight.id;
          newgrd.flight.group = vetdoc.flight.group;
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
    }
  });
}

