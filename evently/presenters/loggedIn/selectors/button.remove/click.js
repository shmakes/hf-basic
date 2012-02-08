function() {
  var row = $(this).parent().parent();
  var id = row[0].id;

  var app = $$(this).app;
  app.db.openDoc("xref_PresentationVeterans", {
    success : function(doc) {
      delete doc.items[id];
      app.db.saveDoc(doc);
    }
  });

  // Remover the row we just deleted.
  row.remove();

  return false;
};

//@ sourceURL=presenters/loggedIn/selectors/remove~click.js
