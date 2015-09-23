function() {
  var app = $$(this).app;
  var user = $("#user_name").text();
  var flightName = $("#flightName").val();
  var vetQty = $("#vetQty").val();

  if ((vetQty < 1) || (vetQty > 100)) {
    return true;
  }

  $("#progress_trigger").click();  

  var added = 0;
  var vetCount = 0;

  app.db.view("basic/waitlist_veterans_active", {
    limit : vetQty,
    descending : false,
    include_docs: true,
    type : "newRows",
    success: function(resp) {
      var rowCount = resp.rows.length;

      var vetList = {};
      for (row in resp.rows) {
        var grp = resp.rows[row].value;
        if (grp.length > 0) {
          if (vetList.hasOwnProperty(grp)) {
            vetList[grp].push(resp.rows[row].id);
          } else {
            vetList[grp] = new Array(resp.rows[row].id);
          }
        }
      }

      var grpCount = 0;
      for (var key in vetList) {
        if (vetList.hasOwnProperty(key)) grpCount++;
      }

      if (grpCount > 0) {
        app.db.view("basic/waitlist_veteran_groups", {
          descending : false,
          include_docs: true,
          type : "newRows",
          success: function(respGrps) {
            for (rowGrp in respGrps.rows) {
              grpName = respGrps.rows[rowGrp].key;
              // See if the group is one being added to the flight.
              if (vetList.hasOwnProperty(grpName)) {
                // Make sure the group member is not already being added to the flight.
                var grpVetId = respGrps.rows[rowGrp].id;
                var thisGrp = vetList[grpName];
                var pos = $.inArray(grpVetId, thisGrp);
                if (pos === -1) {
                  // Make sure the group member is not already on another flight.
                  var fltId = respGrps.rows[rowGrp].doc.flight.id;
                  if ((fltId === "None") || (fltId.length === 0)) {
                    resp.rows.push({ id: grpVetId, key: grpName, value: "", doc: respGrps.rows[rowGrp].doc });
                  }
                }
              }
            }
            addVets(app, user, flightName, resp.rows);
          }
        });
      } else {
        addVets(app, user, flightName, resp.rows);
      }
    }
  });

  $("#vetQty").val("0");
  return true;
};

//@ sourceURL=flight_assign/loggedIn/selectors/#addVets~click.js
