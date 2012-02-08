function() {
  var id = $("input[name='_id']").val();
  var name = $("input[name='first_name']").val()
              + " " + 
              $("input[name='last_name']").val()
  var user = $("#user_name").text();
  var timestamp = ISODateString(new Date());

  if (id.length == 32) {
    var app = $$(this).app;
    app.db.openDoc("xref_PresentationVeterans", {
      success : function(doc) {
        doc.items[id] = {
          "name" : name,
          "added_by" : user
        };
        if (!doc.metadata) {
          doc.metadata = {};
        }
        doc.metadata.updated_at = timestamp;
        doc.metadata.updated_by = user;
        app.db.saveDoc(doc, {
          success : function(doc) {
            alert("Added " + name + " to presenters list.");
          }
        });
      }
    });
  }
  return false;
};

//@ sourceURL=vetedit/loggedIn/selectors/#add_to_vet_presenters~click.js
