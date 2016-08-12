function() {
  var app = $$(this).app;
  var altId = app.req.query.vetid;
  var docId = $("input[name='_id']").val();
  var content = "<br /><ul>";
  var output = $("#flight_history_content");
  output.html("");
  app.db.openDoc(docId, {
    success : function(doc) {
      vetName = doc.name.first + " " + doc.name.last;
      if (doc.flight && doc.flight.history && doc.flight.history.length > 0) {
        var entries = doc.flight.history;
        for (e in entries) {
          content += "<li>" + entries[e].id + ": " + entries[e].change + "</li>";
        }
      } else {
        $("#flight_history_content").html("<h3>No flight history found.</h3>");
      }
      content += "</ul><br /><hr />";
      output.append(content);
    }
  });
  $("#flight_history_trigger").click();
  return false;
};

//@ sourceURL=vetedit/loggedIn/selectors/#showFlightHistory~click.js
