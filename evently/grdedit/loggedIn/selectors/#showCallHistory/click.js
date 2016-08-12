function() {
  var app = $$(this).app;
  var altId = app.req.query.vetid;
  var docId = $("input[name='_id']").val();
  var content = "<br /><ul>";
  var output = $("#call_history_content");
  output.html("");
  app.db.openDoc(docId, {
    success : function(doc) {
      vetName = doc.name.first + " " + doc.name.last;
      if (doc.call && doc.call.history && doc.call.history.length > 0) {
        var entries = doc.call.history;
        for (e in entries) {
          content += "<li>" + entries[e].id + ": " + entries[e].change + "</li>";
        }
      } else {
        $("#call_history_content").html("<h3>No call history found.</h3>");
      }
      content += "</ul><br /><hr />";
      output.append(content);
    }
  });
  $("#call_history_trigger").click();
  return false;
};

//@ sourceURL=grdedit/loggedIn/selectors/#showcallHistory~click.js
