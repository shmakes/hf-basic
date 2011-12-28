function() {
  var value = $("#phone_num").val();
  var sts = $("#status").val();
  var flt = $("#flight").val();
  
  // Clear the result area.
  var rslt = $("#results");
  rslt.html("");
  $("th.colCity").text("Phone Number");
  $("th.colAppDate").text("Phone Type");
  $("#last_name").val("");
  $("#first_name").val("");
  $("#city").val("");

  if (value.match(/[^0-9\-]/g)) {
    value = value.replace(/[^0-9\-]/g, '');
    $("#phone_num").val(value);
  }

  value = value.replace(/[^0-9]/g, '');
  var startKey = [];
  var endKey = [];
  var viewName = "basic/all_by_phone_number";

  if (value.length > 2) {
    startKey.push(value);
    endKey.push(value + "\ufff0");

    // Get the data.
    var app = $$(this).app;
    app.db.view(viewName, {
      startkey : startKey,
      endkey : endKey,
      descending : false,
      type : "newRows",
      success: function(resp) {
        var id, person, anchor, tr;
        for (row in resp.rows) {
          anchor = "<a href='#'>";
          id = resp.rows[row].id;
          person = resp.rows[row].value;

          if ((flt === "All") || (flt === person.flight)) {
            if ((sts === "All") || (sts === person.status)) {

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
        }
      }
    })
  }
  return true;
};

//@ sourceURL=finder/loggedIn/selectors/#phone_number_search/click.js
