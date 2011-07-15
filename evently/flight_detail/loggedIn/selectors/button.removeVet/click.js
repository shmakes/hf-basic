function() {
  var row = $(this).parent().parent();
  var vetId = row.attr("vetid");
  if (vetId.length == 32) {
    var app = $$(this).app;
    var user = $("#user_name").text();
    var timestamp = ISODateString(new Date());

    app.db.openDoc(vetId, {
      success : function(doc) {
        oldFlight = doc.flight.id;
        doc.flight.id = "None";
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight from: " + oldFlight + " to: None by: " + user
        });

        app.db.saveDoc(doc, {
          success : function() {
              //window.location.reload();
              row.remove();
            }
        });
      }
    });
  }
  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#.removeVet~click.js
