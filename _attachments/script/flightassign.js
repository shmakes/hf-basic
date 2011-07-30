$.couch.app(function(app) {  
  $("#flight_assign").evently("flight_assign", app);
  $.evently.connect($("#account"), $("#flight_assign"), ["loggedIn", "loggedOut"]);
});

function addVets(app, user, flightName, vets) {
  var vetQty = $("#vetQty").val();
  var timestamp = ISODateString(new Date());
  var added = 0;
  var vetCount = 0;
  var rowCount = vets.length;

  for (row in vets) {
    var doc = vets[row].doc;
    if (doc.guardian.id.length === 32) {
      added--;  // Make sure we wait for the guardian to be saved.
      app.db.openDoc(doc.guardian.id, {
          success : function(docGrd) {
            var grdOldFlight = docGrd.flight.id;
            // Check if the guardian is on this flight.
            if (grdOldFlight != flightName) {
              docGrd.flight.id = flightName;
              docGrd.flight.history.push({
                id: timestamp,
                change: "changed flight from: " + grdOldFlight + " to: " + flightName + " by: " + user
              });

              app.db.saveDoc(docGrd, {
                success : function() {
                  added++;
                  if (added >= rowCount) {
                    window.location.reload();
                  }
                }
              });
            } else {
              // The guardian was already on the flight, so don't wait.
              added++;
              if (added >= rowCount) {
                window.location.reload();
              }
            }
          }
      });
    }
    var oldFlight = doc.flight.id;
    doc.flight.id = flightName;
    doc.flight.history.push({
      id: timestamp,
      change: "changed flight from: " + oldFlight + " to: " + flightName + " by: " + user
    });

    app.db.saveDoc(doc, {
      success : function() {
        added++;
        vetCount++;
        $("#prog_added").val(vetCount.toString());
        if (added >= rowCount) {
          window.location.reload();
        }
      }
    });
  }
}
