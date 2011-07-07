function() {
  var zip = $("input[name='zip']").val();
  if (zip.length == 5) {
    var app = $$(this).app;

    app.db.openDoc("loc-" + zip, {
      success : function(doc) {
        $("input[name='city']").val(doc.city)
        $("input[name='state']").val(doc.state)
      }
    });
  }
  return false;
};

//@ sourceURL=voledit/loggedIn/selectors/#zipFill~click.js
