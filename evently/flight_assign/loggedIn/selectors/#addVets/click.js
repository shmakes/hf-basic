function() {
  var app = $$(this).app;
  var user = $("#user_name").text();
  var flightName = $("#flightName").val();
  var vetQty = $("#vetQty").val();
  var timestamp = ISODateString(new Date());

  if ((vetQty < 1) || (vetQty > 100)) {
    return true;
  }

  $("#progress_trigger").click();  

  var added = 0;

  app.db.view("basic/waitlist_veterans", {
    limit : vetQty,
    descending : false,
    include_docs: true,
    type : "newRows",
    success: function(resp) {
      rowCount = resp.rows.length;
      for (row in resp.rows) {
        doc = resp.rows[row].doc;
        if (doc.guardian.id.length === 32) {
          // Check if the guardian is on this flight.
          app.db.openDoc(doc.guardian.id, {
              success : function(docGrd) {
                grdOldFlight = docGrd.flight.id;
                if (grdOldFlight != flightName) {
                  docGrd.flight.id = flightName;
                  docGrd.flight.history.push({
                    id: timestamp,
                    change: "changed flight from: " + grdOldFlight + " to: " + flightName + " by: " + user
                  });

                  app.db.saveDoc(docGrd, {
                    success : function() {
                    }
                  });
                }
              }
          });
        }
        oldFlight = doc.flight.id;
        doc.flight.id = flightName;
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight from: " + oldFlight + " to: " + flightName + " by: " + user
        });

        app.db.saveDoc(doc, {
          success : function() {
            added++;
            $("#prog_added").val(added.toString());
            if (added >= rowCount) {
              window.location.reload();
            }
          }
        });
      }
    }
  });

  $("#vetQty").val("0");
  return true;
};

//@ sourceURL=flight_assign/loggedIn/selectors/#addVets~click.js
