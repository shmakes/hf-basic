function() {
  var app = $$(this).app;
  var user = $("#user_name").text();
  var flightName = $("#flightName").val();
  var vetQty = $("#vetQty").val();
  var timestamp = ISODateString(new Date());

  if (vetQty < 1) {
    return true;
  }

  while (vetQty > 0) {

    app.db.view("basic/waitlist_veterans", {
      limit : 1,
      descending : false,
      include_docs: true,
      type : "newRows",
      success: function(resp) {
        if (resp.rows.length > 0) {
          doc = resp.rows[0].doc;
          oldFlight = doc.flight.id;
          doc.flight.id = flightName;
          doc.flight.history.push({
            id: timestamp,
            change: "changed flight from: " + oldFlight + " to: " + flightName + " by: " + user
          });

          app.db.saveDoc(doc, {
            success : function() {
            }
          });
        }
      }
    });

    vetQty--;
  }



  $("#vetQty").val("0");

  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#addVets~click.js
