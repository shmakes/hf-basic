function() {
  var app = $$(this).app;
  var altId = app.req.query.vetid;
  var docId = $("input[name='_id']").val();
  var content = "<br /><ul>";
  var output = $("#pairing_history_content");
  output.html("");
  app.db.openDoc(docId, {
    success : function(doc) {
      vetName = doc.name.first + " " + doc.name.last;
      if (doc.veteran && doc.veteran.history && doc.veteran.history.length > 0) {
        var entries = doc.veteran.history;
        for (e in entries) {
          content += "<li>" + entries[e].id + ": " + entries[e].change + "</li>";
        }
      } else {
        $("#pairing_history_content").html("<h3>No pairing history found.</h3>");
      }
      content += "</ul><br /><hr />";
      output.append(content);
    }
  });
  $("#pairing_history_trigger").click();
  return false;
};

//@ sourceURL=grdedit/loggedIn/selectors/#showpairingHistory~click.js
