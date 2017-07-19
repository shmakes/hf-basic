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
  var cat = propMap[1];
  var prp = propMap.slice(2).join("_");
  app.db.openDoc(docId, {
    success : function(doc) {
        doc.flight.history.push({
          id: ISODateString(new Date()),
          change: "changed " + cat + " " + propMap.slice(2).join(" ") + " from: " + doc[cat][prp] + " to: " + newCheckValue + " by: " + user
        });

        doc[cat][prp] = newCheckValue;
        app.db.saveDoc(doc, {
          success : function() {}
        });
    }
  });
}
