function() {
  var row = $(this).parent().parent();
  var docId = row.attr("id");
  var docType = row.attr("class");
  var tableBody = row.parent();
  var rowCount = tableBody[0].rows.length;
  var tableParentRow = tableBody.parent().parent().parent();
  if (docId.length == 32) {
    var app = $$(this).app;
    var user = $("#user_name").text();
    var timestamp = ISODateString(new Date());

    app.db.openDoc(docId, {
      success : function(doc) {
        oldFlight = doc.flight.id;
        doc.flight.id = "None";
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight from: " + oldFlight + " to: None by: " + user
        });
        doc.metadata.updated_at = timestamp;
        doc.metadata.updated_by = user;

        app.db.saveDoc(doc, {
          success : function() {
              row.remove();
              if (rowCount < 2) {
                tableParentRow.remove();
              }
              if (docType == "Veteran") {
                vetCount = parseInt($("#vetCount").val());
                $("#vetCount").val((vetCount - 1).toString());
              }
              if (docType == "Guardian") {
                grdCount = parseInt($("#grdCount").val());
                $("#grdCount").val((grdCount - 1).toString());
              }
              remainCount = parseInt($("#remainCount").val());
              $("#remainCount").val((remainCount + 1).toString());
            }
        });
      }
    });
  }
  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#.remove~click.js
