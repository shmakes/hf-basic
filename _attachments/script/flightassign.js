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
              docGrd.metadata.updated_at = timestamp;
              docGrd.metadata.updated_by = user;

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
    doc.metadata.updated_at = timestamp;
    doc.metadata.updated_by = user;

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

function updateCounts() {
  var vets = [], grds = [], vetsConf = [], grdsConf = [], vetCnt = 0, grdCnt = 0, vetCnf = 0, grdCnf = 0;
  $("tr.Veteran").each(function() {
    var vetId = $(this).attr("id");
    if (vetId.length > 0) vets.push(vetId);
    var vetConfirmed = $(this).children("td.confirmed");
    if (vetConfirmed.length > 0) vetsConf.push(vetId);
  });
  vetCnt = strUnique(vets).length;
  vetCnf = strUnique(vetsConf).length;
  $("#vetCount").val(vetCnt);
  $("#vetConfirm").val(vetCnf);

  $("tr.Guardian").each(function() {
    var grdId = $(this).attr("id");
    if (grdId.length > 0) grds.push(grdId);
    var grdConfirmed = $(this).children("td.confirmed");
    if (grdConfirmed.length > 0) grdsConf.push(grdId);
  });
  grdCnt = strUnique(grds).length;
  grdCnf = strUnique(grdsConf).length;
  $("#grdCount").val(grdCnt);
  $("#grdConfirm").val(grdCnf);

  var capacity = parseInt($("#flightCap").val());
  $("#remainCount").val(capacity - vetCnt - grdCnt);
  $("#ttlConfirm").val(vetCnf + grdCnf);
}

function changeCaller(app, docId, newCaller, user) {


  app.db.openDoc(docId, {
    success : function(doc) {
        if (newCaller != doc.call.assigned_to) {
          doc.call.history.push({
            id: ISODateString(new Date()),
            change: "changed assigned caller from: " + doc.call.assigned_to + " to: " + newCaller + " by: " + user
          });
          doc.call.assigned_to = newCaller;
          app.db.saveDoc(doc, {
            success : function() {}
          });
        }
    }
  });
}


