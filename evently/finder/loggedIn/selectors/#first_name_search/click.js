function() {
  var value = $("#first_name").val();
  var sts = $("#status").val();
  var flt = $("#flight").val();
  
  // Clear the result area.
  var rslt = $("#results");
  rslt.html("");
  $("th.colCity").text("City");
  $("th.colAppDate").text("App. Date");
  $("#last_name").val("");
  $("#city").val("");
  $("#phone_num").val("");

  if (value.match(/[^a-zA-Z'\. ]/g)) {
    value = value.replace(/[^a-zA-Z'\. ]/g, '');
    $("#first_name").val(value);
  }

  value = value.replace(/['\. ]/g, '');
  var startKey = [];
  var endKey = [];
  var viewName = "basic/all_by_first_name";

  if (value.length > 0) {
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
        var id, person, anchor, anchorOther, tr;
        for (row in resp.rows) {
          anchor = "<a href='#'>";
          id = resp.rows[row].id;
          person = resp.rows[row].value;

          if ((flt === "All") || (flt === person.flight)) {
            if ((sts === "All") || (sts === person.status)) {

              if (person.type == 'Veteran') {
                anchor = "<a href='vet_edit.html?vetid=" + id + "' target='_blank'>";
                anchorOther = person.pairingId ? "<a href='grd_edit.html?grdid=" + person.pairingId + "' target='_blank'>" : anchor;
              } else if (person.type == 'Guardian') {
                anchor = "<a href='grd_edit.html?grdid=" + id + "' target='_blank'>";
                anchorOther = person.pairingId ? "<a href='vet_edit.html?vetid=" + person.pairingId + "' target='_blank'>" : anchor;
              } else if (person.type == 'Volunteer') {
                anchor = "<a href='vol_edit.html?volid=" + id + "' target='_blank'>";
                anchorOther = anchor;
              }

              tr = $("<tr/>", { class: person.type });
              tr.append("<td>" + anchor + person.name + "</a></td>");
              tr.append("<td>" + anchor + person.city + "</a></td>");
              tr.append("<td>" + anchor + person.appdate + "</a></td>");
              tr.append("<td>" + anchor + person.flight + "</a></td>");
              tr.append("<td>" + anchor + person.status + "</a></td>");
              tr.append("<td>" + anchorOther + person.pairing + "</a></td>");
              rslt.append(tr);

            }
          }
        }
      }
    })
  }
  return true;
};

//@ sourceURL=finder/loggedIn/selectors/#first_name_search/click.js
