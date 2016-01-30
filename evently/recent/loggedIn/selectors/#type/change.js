function() {
  var value = $(this).val();
  var lstType = $("#type").val();

  var viewName = "basic/admin_recent_changes";

  switch (lstType) {
    case "Added":
      viewName = "basic/admin_recent_additions";
      break;
    case "Modified":
      viewName = "basic/admin_recent_changes";
      break;
    case "Call Center":
      viewName = "basic/admin_recent_call_changes";
      break;
    case "Flight":
      viewName = "basic/admin_recent_flight_changes";
      break;
    case "Pairing":
      viewName = "basic/admin_recent_pairing_changes";
      break;
  }

  // Clear the result area.
  var rslt = $("#results");
  rslt.html("");

  // Get the data.
  var app = $$(this).app;
  app.db.view(viewName, {
    limit : 50,
    descending : true,
    type : "newRows",
    success: function(resp) {
      for (row in resp.rows) {
        var id = resp.rows[row].id;
        var person = resp.rows[row].value;

        var anchor = "<a href='#'>";
        if (person.type == 'Veteran') {
          anchor = "<a href='vet_edit.html?vetid=" + id + "' target='_blank'>";
        } else if (person.type == 'Guardian') {
          anchor = "<a href='grd_edit.html?grdid=" + id + "' target='_blank'>";
        } else if (person.type == 'Volunteer') {
          anchor = "<a href='vol_edit.html?volid=" + id + "' target='_blank'>";
        }


        tr = $("<tr/>", { class: person.type });
        tr.append("<td>" + anchor + person.name + "</a></td>");
        tr.append("<td>" + anchor + person.city + "</a></td>");
        tr.append("<td>" + anchor + person.appdate + "</a></td>");
        tr.append("<td>" + anchor + person.recdate + "</a></td>");
        tr.append("<td>" + anchor + person.recby + "</a></td>");
        tr.append("<td>" + anchor + person.change + "</a></td>");
        rslt.append(tr);     
      }
    }
  })

  return true;
};

//@ sourceURL=recent/loggedIn/selectors/#type/change.js
