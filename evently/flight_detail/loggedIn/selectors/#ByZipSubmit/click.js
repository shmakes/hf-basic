function() {
  var user = $("#user_name").text();
  var timestamp = ISODateString(new Date());  
  var zipSel = $("select#SelectByZip");
  var grdIdNew = zipSel.val();
  var grdIdOld = $("#grd_id").val();
  var vetId = $("#vet_id").val();
  var vetName = $("#vet_name")[0].textContent;

    var app = $$(this).app;
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
                oldgrd.flight.id = "";
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
          }
        });
      }
    });



  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByZipSubmit/click.js
