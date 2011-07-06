function() {
  var zip = $("input[name='zip']").val();
  if (zip.length == 5) {
    var app = $$(this).app;

    app.db.openDoc("loc-" + zip, {
      success : function(doc) {
        $("input[name='city']").val(doc.city)
        $("input[name='state']").val(doc.state)
        $("input[name='county']").val(doc.county)
      }
    });
  }
  return false;
};

//@ sourceURL=vetedit/loggedIn/selectors/#zipFill~click.js
