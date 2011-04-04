function() {
  var vetId = $("#vet_id_pref").val();
  var vetName = $("#vet_name_pref")[0].textContent;
  var user = $("#user_name").text();
  var app = $$(this).app;

  var startLastName = $("input#last_name_search").val().toUpperCase();
  var endLastName = startLastName + "\ufff0";
  var lastnameSel = $("select#SelectByLastNameSearch");
  lastnameSel.find('option').remove().end();
  var lastnameOpt = lastnameSel.attr('options');
  app.db.view("basic/guardians_by_lastname", {
    descending : false,
    limit: 50,
    startkey : [ startLastName ],
    endkey : [ endLastName ],
    success: function(resp) {
      selected = true;
      for (idx in resp.rows) {
        row = resp.rows[idx];
        entry = row.value.name + " | " + row.value.street + " | " + row.value.city;
        lastnameOpt[lastnameOpt.length] = new Option(entry, row.id, selected, selected);
        selected = false;
      }
    }
  })

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#ByLastNameSearchSubmit~click.js
