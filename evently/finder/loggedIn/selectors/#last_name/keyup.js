function() {
  var value = $(this).val();
  var sts = $("#status").val();
  var flt = $("#flight").val();
  
  if (value.match(/[^a-zA-Z ]/g)) {
    this.value = this.value.replace(/[^a-zA-Z ]/g, '');
    return false;
  }

  var startKey = [];
  var endKey = [];
  var viewName = "basic/all_by_name";

  if ((sts != "All") && (flt == "All")) {
    startKey.push(sts);
    endKey.push(sts);
    viewName = "basic/all_by_status_and_name";
  } else if ((flt != "All") && (sts == "All")) {
      startKey.push(flt);
      endKey.push(flt);
      viewName = "basic/all_by_flight_and_name";
  }

  if (value.length > 0) {
    startKey.push(value);
    endKey.push(value + "\ufff0");
  } else {
    startKey.push("a");
    endKey.push("\ufff0");
  }

  // Clear the result area.
  var rslt = $("#results");
  rslt.html("");

  // Get the data.
  var app = $$(this).app;
  app.db.view(viewName, {
    limit : 50,
    startkey : startKey,
    endkey : endKey,
    descending : false,
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
        tr.append("<td>" + anchor + person.flight + "</a></td>");
        tr.append("<td>" + anchor + person.status + "</a></td>");
        tr.append("<td>" + anchor + person.pairing + "</a></td>");
        rslt.append(tr);     
      }
    }
  })

  return true;
};

//@ sourceURL=finder/loggedIn/selectors/#last_name/keyup.js
