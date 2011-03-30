/*
   Copyright 2011 Steve Schmechel

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License
*/

function() {
  var value = $(this).val();
  var flt = $("#flight").val();
  
  if (value.match(/[^a-zA-Z ]/g)) {
    this.value = this.value.replace(/[^a-zA-Z ]/g, '');
    return false;
  }

  var startKey = [];
  var endKey = [];
  var viewName = "basic/all_by_name";

  if (flt != "All") {
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
