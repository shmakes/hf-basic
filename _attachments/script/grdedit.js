$.couch.app(function(app) {  
  $("#grdedit").evently("grdedit", app);
  $.evently.connect($("#account"), $("#grdedit"), ["loggedIn", "loggedOut"]);
});

function UpdateVeteranLinks() {
  var vetId = $("#veteran_id").attr('value');
  if (vetId.length === 0) {
    $("#vet_edit_link").hide();
  } else {
    var lnk = $("#vet_edit_link");
    lnk.show();
    lnk.attr("href", "vet_edit.html?vetid=" + vetId);
  }

  var vetId2 = $("#veteran_id2").attr('value');
  if (vetId2.length === 0) {
    $("#vet_edit_link2").hide();
  } else {
    var lnk2 = $("#vet_edit_link2");
    lnk2.show();
    lnk2.attr("href", "vet_edit.html?vetid=" + vetId2);
  }
}

function UpdateGuardianPairingFields(vet, grd) {
  var vetId1 = vetId2 = vetName1 = vetName2 = "";
  if ((grd.veteran) && (grd.veteran.pairings)) {
    if (grd.veteran.pairings.length > 0) {
      vetId1 = grd.veteran.pairings[0].id;
      vetName1 = grd.veteran.pairings[0].name;
    }
    if (grd.veteran.pairings.length > 1) {
      vetId2 = grd.veteran.pairings[1].id;
      vetName2 = grd.veteran.pairings[1].name;
    }
  }

  $("input#veteran_id").val(vetId1);
  $("input#veteran_name").val(vetName1);
  $("input#veteran_id2").val(vetId2);
  $("input#veteran_name2").val(vetName2);

  $("input#docrev").val(grd._rev);

  UpdateVeteranLinks();
  $("#pair_trigger").overlay().close();
  $("#unpair_trigger").overlay().close();
}

function PairGuardianToVeteran(app, vetId, grdIdNew, user) {
  var timestamp = ISODateString(new Date());
  var grdIdOld;
  var vetName;

  app.db.openDoc(vetId, {
    success : function(vetdoc) {
      vetName = vetdoc.name.first + " " + vetdoc.name.last;
      grdIdOld = vetdoc.guardian.id;

      // If an old guardian exists, unpair and log.
      if (grdIdOld.length === 32) {
        app.db.openDoc(grdIdOld, {
          success : function(oldgrd) {
            for (vetIdx in oldgrd.veteran.pairings) {
              if (oldgrd.veteran.pairings[vetIdx].id === vetId) {
                oldgrd.veteran.history.push({
                  id: timestamp,
                  change: "unpaired from: " + vetName + " by: " + user
                });
                oldgrd.metadata.updated_at = timestamp;
                oldgrd.metadata.updated_by = user;

                oldgrd.veteran.pairings.splice(vetIdx, 1);
                app.db.saveDoc(oldgrd, {
                  success : function() {
                      PairGuardianToVeteran2(app, vetdoc, vetName, grdIdNew, oldgrd, user)
                    }
                });
                break;
              }
            }
          }
        });
      } else {
        PairGuardianToVeteran2(app, vetdoc, vetName, grdIdNew, {}, user)
      }
    }
  });
}


function PairGuardianToVeteran2(app, vetdoc, vetName, grdIdNew, oldgrd, user) {
  var timestamp = ISODateString(new Date());

  // Get the new guardian.
  if (grdIdNew.length === 32) {
    app.db.openDoc(grdIdNew, {
      success : function(newgrd) {
        newgrd.veteran.history.push({
          id: timestamp,
          change: "paired to: " + vetName + " by: " + user
        });
        newgrd.metadata.updated_at = timestamp;
        newgrd.metadata.updated_by = user;

        newgrd.veteran.pairings.push({
          id: vetdoc._id,
          name: vetName
        });

        app.db.saveDoc(newgrd, {
          success : function() {
            // Update veteran history.
            grdName = newgrd.name.first + " " + newgrd.name.last;
            vetdoc.guardian.history.push({
              id: timestamp,
              change: "paired to: " + grdName + " by: " + user
            });
            vetdoc.metadata.updated_at = timestamp;
            vetdoc.metadata.updated_by = user;

            vetdoc.guardian.id = grdIdNew;
            vetdoc.guardian.name = grdName;

            app.db.saveDoc(vetdoc, {
              success : function() {
                UpdateGuardianPairingFields(vetdoc._id, newgrd);
              }
            });
          }
        });
      }
    });
  } else {
        // Update veteran history.
        vetdoc.guardian.history.push({
          id: timestamp,
          change: "unpaired from: " + vetdoc.guardian.name + " by: " + user
        });
        vetdoc.guardian.id = "";
        vetdoc.guardian.name = "";
        vetdoc.metadata.updated_at = timestamp;
        vetdoc.metadata.updated_by = user;

        app.db.saveDoc(vetdoc, {
          success : function() {
            UpdateGuardianPairingFields(vetdoc._id, oldgrd);
          }
        });
  }

}

function update_status_ctrl_states() {
  if($("#flight_status").val() !== "Active") {
    $("#flight_id").attr('disabled', 'disabled');
    $("input[name='flight_group']").attr('disabled', 'disabled');
    $("#pair_add").attr('disabled', 'disabled');
    $("#pair_rem").attr('disabled', 'disabled');
    $("#flight_confirmed_date").attr('disabled', 'disabled');
    $("input[name='flight_confirmed_by']").attr('disabled', 'disabled');
    $("input[name='flight_seat']").attr('disabled', 'disabled');
    $("input[name='preferred_airport']").attr('disabled', 'disabled');
    $("#flight_bus").attr('disabled', 'disabled');
    $("input[name='veteran_pref_notes']").attr('disabled', 'disabled');
  } else {
    $("#flight_id").removeAttr("disabled");
    $("input[name='flight_group']").removeAttr("disabled");
    $("#pair_add").removeAttr("disabled");
    $("#pair_rem").removeAttr("disabled");
    $("#flight_confirmed_date").removeAttr("disabled");
    $("input[name='flight_confirmed_by']").removeAttr("disabled");
    $("input[name='flight_seat']").removeAttr("disabled");
    $("input[name='preferred_airport']").removeAttr("disabled");
    $("#flight_bus").removeAttr("disabled");
    $("input[name='veteran_pref_notes']").removeAttr("disabled");
  }
} 

