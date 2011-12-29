$.couch.app(function(app) {  
  $("#waitlist").evently("waitlist", app);
  $.evently.connect($("#account"), $("#waitlist"), ["loggedIn", "loggedOut"]);
});

function renderWaitlist(db, viewName, startPos, renderFunction, targetElement) {
  db.view(viewName, {
    descending : false,
    include_docs: false,
    stale: "ok",
    type : "newRows",
    success: function(resp) {
      var rowCount = resp.rows.length;
      if (rowCount >= startPos) {
        var startKey = resp.rows[(startPos - 1)].key;
        var startId = resp.rows[(startPos - 1)].id;

        db.view(viewName, {
          limit : 100,
          descending : false,
          include_docs: true,
          startkey: startKey,
          startkey_docid: startId,
          stale: "ok",
          type : "newRows",
          success: function(respDocs) {
            var relPos = 0;
            for (row in respDocs.rows) {
              renderFunction(targetElement, respDocs.rows[row].doc, (startPos + relPos));
              relPos += 1;
            }
            $("table").tablesorter();
          }
        });
      }
    }
  });
}

function addVetHeader() {
  var hdr = $("thead");
  hdr.html("");
  var tr = $("<tr/>");
  tr.append("<th>Position</th>");
  tr.append("<th>App. Date</th>");
  tr.append("<th>Name</th>");
  tr.append("<th>Age</th>");
  tr.append("<th>Wheelchair Bound</th>");
  tr.append("<th>Oxygen</th>");
  tr.append("<th>Shirt Size</th>");
  tr.append("<th>Guardian</th>");
  tr.append("<th>City</th>");
  hdr.append(tr); 
}

function addVetRow(tbody, doc, position) {
  var age = "?";
  if (doc.birth_date) {
    var birthYear = new Date(doc.birth_date.replace(/-/g, "/")).getFullYear();
    var thisYear = new Date().getFullYear();
    age = thisYear - birthYear;
  }
  var anchor = "<a href='vet_edit.html?vetid=" + doc._id + "' target='_blank'>";

  var tr = $("<tr class='Veteran'/>");
  tr.append("<td>" + anchor + position + "</a></td>");
  tr.append("<td>" + anchor + doc.app_date + "</a></td>");
  tr.append("<td>" + anchor + doc.name.first + " " + doc.name.last + "</a></td>");
  tr.append("<td>" + anchor + age + "</a></td>");
  tr.append("<td>" + anchor + (doc.medical.isWheelchairBound ? "Yes" : "") + "</a></td>");
  tr.append("<td>" + anchor + (doc.medical.requiresOxygen ? "Yes" : "") + "</a></td>");
  tr.append("<td>" + anchor + doc.shirt.size + "</a></td>");
  tr.append("<td>" + anchor + doc.guardian.name + "</a></td>");
  tr.append("<td>" + anchor + doc.address.city + "</a></td>");
  tbody.append(tr); 
}

function addGrdHeader() {
  var hdr = $("thead");
  hdr.html("");
  var tr = $("<tr/>");
  tr.append("<th>Position</th>");
  tr.append("<th>App. Date</th>");
  tr.append("<th>Name</th>");
  tr.append("<th>Age</th>");
  tr.append("<th>Shirt Size</th>");
  tr.append("<th>Med. Training</th>");
  tr.append("<th>Veteran</th>");
  tr.append("<th>City</th>");
  hdr.append(tr); 
}

function addGrdRow(tbody, doc, position) {
  var age = "?";
  if (doc.birth_date) {
    var birthYear = new Date(doc.birth_date.replace(/-/g, "/")).getFullYear();
    var thisYear = new Date().getFullYear();
    age = thisYear - birthYear;
  }
  var vet = "";
  if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
    vet = doc.veteran.pairings[0].name;
  }
  var anchor = "<a href='grd_edit.html?grdid=" + doc._id + "' target='_blank'>";

  var tr = $("<tr class='Guardian'/>");
  tr.append("<td>" + anchor + position + "</a></td>");
  tr.append("<td>" + anchor + doc.app_date + "</a></td>");
  tr.append("<td>" + anchor + doc.name.first + " " + doc.name.last + "</a></td>");
  tr.append("<td>" + anchor + age + "</a></td>");
  tr.append("<td>" + anchor + doc.shirt.size + "</a></td>");
  tr.append("<td>" + anchor + doc.medical.experience + "</a></td>");
  tr.append("<td>" + anchor + vet + "</a></td>");
  tr.append("<td>" + anchor + doc.address.city + "</a></td>");
  tbody.append(tr); 
}
