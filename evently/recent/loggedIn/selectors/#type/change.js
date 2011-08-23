function() {
  var value = $(this).val();
  var lstType = $("#type").val();

  var viewName = "basic/admin_recent_additions";

  if (lstType === "Modified") {
    viewName = "basic/admin_recent_changes";
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
        rslt.append(tr);     
      }
    }
  })

  return true;
};

//@ sourceURL=recent/loggedIn/selectors/#type/change.js
