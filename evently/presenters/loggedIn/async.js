function(cb) {
  var app = $$(this).app;
  var docid = "xref_PresentationVeterans";

  app.db.openDoc(docid, {
    success : function(doc) {
      cb(doc);
    }
  });
};

//@ sourceURL=/presenters/async.js
