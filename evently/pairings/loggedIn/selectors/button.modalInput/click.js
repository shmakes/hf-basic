function() {
  var vetId = $(this).parent().parent().attr("vetid");
  if (vetId.length == 32) {
    // Add the veteran name.
    $("#vet_name")[0].textContent = $(this).parent().siblings()[1].textContent;
    var grdId = $(this).parent().parent().attr("grdid");
    $("#vet_id").val(vetId);
    $("#grd_id").val(grdId);

    var app = $$(this).app;

    app.db.openDoc(vetId, {
      success : function(doc) {

        var vetLastName = doc.name.last.toUpperCase();
        $("#byPref")[0].textContent = doc.name.last;
        var prefSel = $("select#SelectByPref");
        prefSel.find('option').remove().end();
        var prefOpt = prefSel.attr('options');
        app.db.view("basic/guardians_by_pref", {
          descending : false,
          limit: 10,
          startkey : [ vetLastName ],
          endkey : [ vetLastName + "\ufff0" ],
          success: function(resp) {
            selected = true;
            for (idx in resp.rows) {
              row = resp.rows[idx];
              entry = row.value.name + " | " + row.value.pref;
              prefOpt[prefOpt.length] = new Option(entry, row.id, selected, selected);
              selected = false;
            }
          }
        })


        $("#chooser_trigger").click();
      }
    });
  }
  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#.modalInput~click.js
