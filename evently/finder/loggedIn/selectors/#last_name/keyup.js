function() {
  var value = $(this).val();
  
  if (value.match(/[^a-zA-Z ]/g)) {
    this.value = this.value.replace(/[^a-zA-Z ]/g, '');
    return false;
  }

  var startString = "a";
  var endString = "zzzz";

  if (value.length > 0) {
    startString = value;
    var lastChar = value.charCodeAt(value.length - 1);
    if ((lastChar == 90) || (lastChar == 122)) {
      endString = value + "z";
    }
    else {
      endString = value.substr(0, value.length - 1) + String.fromCharCode(lastChar + 1);
    }
  }
  //$("p").text(startString + " - " + endString);

  // Clear the result area.
  var rslt = $("#results");
  rslt.html("");

  // Get the data.
  var app = $$(this).app;
  app.db.view("basic/all_by_name", {
    limit : 50,
    startkey : [startString],
    endkey : [endString],
    descending : false,
    type : "newRows",
    success: function(resp) {
      for (row in resp.rows) {
        var id = resp.rows[row].id;
        var person = resp.rows[row].value[0];

        var anchor = "<a href='#'>";
        if (person.type == 'Veteran') {
          anchor = "<a href='vet_edit.html?vetid=" + id + "'>";
        } else if (person.type == 'Guardian') {
          anchor = "<a href='grd_edit.html?grdid=" + id + "'>";
        }


        tr = $("<tr/>", { class: person.type });
        tr.append("<td>" + anchor + person.name + "</a></td>");
        tr.append("<td>" + anchor + person.city + "</a></td>");
        tr.append("<td>" + anchor + person.appdate + "</a></td>");
        tr.append("<td>" + anchor + person.flight + "</a></td>");
        tr.append("<td>" + anchor + person.group + "</a></td>");
        tr.append("<td>" + anchor + person.pairing + "</a></td>");
        rslt.append(tr);     
      }
    }
  })

  return true;
};

//@ sourceURL=finder/loggedIn/selectors/#last_name/keyup.js
