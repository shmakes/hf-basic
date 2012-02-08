function() {
  var row = $(this).parent().parent();
  var id = row[0].id;
  var user = $("#user_name").text();
  var timestamp = ISODateString(new Date());

  var app = $$(this).app;
  app.db.openDoc("xref_PresentationVeterans", {
    success : function(doc) {
      delete doc.items[id];
      doc.metadata.updated_at = timestamp;
      doc.metadata.updated_by = user;
      app.db.saveDoc(doc);
    }
  });

  // Remover the row we just deleted.
  row.remove();

  return false;
};

//@ sourceURL=presenters/loggedIn/selectors/remove~click.js
