$.couch.app(function(app) {  
  $("#pairing").evently("pairing", app);
  $.evently.connect($("#account"), $("#pairing"), ["loggedIn", "loggedOut"]);
});

function PairGuardianToVeteran(app, vetId, grdIdNew, user) {
  var timestamp = ISODateString(new Date());
  var vetName;

  app.db.openDoc(vetId, {
    success : function(vetdoc) {
      vetName = vetdoc.name.first + " " + vetdoc.name.last;

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
              success : function() {

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

              }
            });
          }
        });
      } 
    }
  });
}

