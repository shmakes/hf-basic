$.couch.app(function(app) {  
  $("#flight_other").evently("flight_other", app);
  $.evently.connect($("#account"), $("#flight_other"), ["loggedIn", "loggedOut"]);
});

function changeApparelNotes(app, docId, newApparelNote, user) {
  app.db.openDoc(docId, {
    success : function(doc) {
        doc.apparel.notes = newApparelNote;
        app.db.saveDoc(doc, {
          success : function() {}
        });
    }
  });
}

function changeShirtSize(app, docId, newShirtSize, user) {
  var validShirtSizes = [ "None", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL" ];
  if (jQuery.inArray(newShirtSize, validShirtSizes) >= 0) {
    app.db.openDoc(docId, {
      success : function(doc) {
          doc.shirt.size = newShirtSize;
          app.db.saveDoc(doc, {
            success : function() {}
          });
      }
    });
  } else {
    alert("Invalid size not saved.");
  }
}

function changeBookCount(app, docId, newBookCount, user) {
  app.db.openDoc(docId, {
    success : function(doc) {
        doc.flight.history.push({
          id: ISODateString(new Date()),
          change: "changed books ordered from: " + doc.flight.booksOrdered + " to: " + newBookCount + " by: " + user
        });

        doc.flight.booksOrdered = newBookCount || 0;
        app.db.saveDoc(doc, {
          success : function() {}
        });
    }
  });
}

function changeCheckbox(app, checkBox, docId, newCheckValue, user) {
  var propMap = checkBox.split("_");
  var cat = propMap[1].replace("mailcall", "mail_call");
  var prp = propMap.slice(2).join("_");
  app.db.openDoc(docId, {
    success : function(doc) {
        if (cat === "mail_call") {
          doc.call.history.push({
            id: ISODateString(new Date()),
            change: "changed " + cat + " " + propMap.slice(2).join(" ") + " from: " + doc[cat][prp] + " to: " + newCheckValue + " by: " + user
          });

        } else {
          doc.flight.history.push({
            id: ISODateString(new Date()),
            change: "changed " + cat + " " + propMap.slice(2).join(" ") + " from: " + doc[cat][prp] + " to: " + newCheckValue + " by: " + user
          });
        }

        doc[cat][prp] = newCheckValue;
        app.db.saveDoc(doc, {
          success : function() {}
        });
    }
  });
}

function changeDestination(app, docId, newDestination, user, flight) {
  app.db.openDoc(docId, {
    success : function(doc) {
        if (!doc.homecoming) {
          doc.homecoming = {};
        }
        doc.homecoming.destination = newDestination;
        app.db.saveDoc(doc, {
          success: function(data) {
            updateDestinationCounts(app, flight);
            console.log(data);
          },
          error: function(status) {
            console.log(status);
          }
        });
    }
  });
}

function updateDestinationCounts(app, flightId) {
  var content = "";
  var output = $("#destination_counts");
  output.html("");
  app.db.view("basic/homecoming_destinations", {
    descending : false,
    group: true,
    group_level: 2,
    include_docs: false,
    start_key: "[\"" + flightId + "\",\" \"]",
    end_key: "[\"" + flightId + "\",{}]",
    type : "newRows",
    success: function(resp) {
      if (resp.rows.length > 0) {
        for (row in resp.rows) {
          var destination = "<span class='homecoming_destination'>" + resp.rows[row].key[1] + "</span>";
          content += destination + ": <strong>" + resp.rows[row].value + "</strong>&nbsp;&nbsp; | ";
        }
      } else {
        content = "<h3>No destinations found.</h3>";
      }
      output.append(content);
    }
  });
}
