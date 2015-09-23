function() {
  var app = $$(this).app;
  var user = $("#user_name").text();
  var flightName = $("#flightName").val();
  var grdQty = $("#grdQty").val();
  var timestamp = ISODateString(new Date());

  if ((grdQty < 1) || (grdQty > 100)) {
    return true;
  }

  $("#progress_trigger").click();  

  var added = 0;

  app.db.view("basic/waitlist_guardians_active", {
    limit : grdQty,
    descending : false,
    include_docs: true,
    type : "newRows",
    success: function(resp) {
      rowCount = resp.rows.length;
      for (row in resp.rows) {
        doc = resp.rows[row].doc;
        oldFlight = doc.flight.id;
        doc.flight.id = flightName;
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight from: " + oldFlight + " to: " + flightName + " by: " + user
        });
        doc.metadata.updated_at = timestamp;
        doc.metadata.updated_by = user;

        app.db.saveDoc(doc, {
          success : function() {
            added++;
            $("#prog_added").val(added.toString());
            if (added == rowCount) {
              window.location.reload();
            }
          }
        });
      }
    }
  });

  $("#grdQty").val("0");
  return true;
};

//@ sourceURL=flight_assign/loggedIn/selectors/#addGrds~click.js
