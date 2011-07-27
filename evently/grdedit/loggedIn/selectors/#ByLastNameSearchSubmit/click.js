function() {
  var vetId = $("#vet_id_pref").val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  var startLastName = $("input#last_name_search").val().toUpperCase();
  var lastnameSel = $("select#SelectByLastNameSearch");
  lastnameSel.find('option').remove().end();
  var lastnameOpt = lastnameSel.attr('options');
  app.db.view("basic/unpaired_veterans_by_last_name", {
    descending : false,
    limit: 50,
    startkey : [ "Active", startLastName ],
    endkey : [ "Active", startLastName + "\ufff0" ],
    success: function(resp) {
      selected = true;
      for (idx in resp.rows) {
        row = resp.rows[idx];
        entry = row.value.name + " | " + row.value.city + " | " + row.value.flight + " | " + row.value.prefs;
        lastnameOpt[lastnameOpt.length] = new Option(entry, row.id, selected, selected);
        selected = false;
      }
    }
  })

  return true;
};

//@ sourceURL=grdedit/loggedIn/selectors/#ByLastNameSearchSubmit~click.js
