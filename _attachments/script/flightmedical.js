$.couch.app(function(app) {  
  $("#flight_medical").evently("flight_medical", app);
  $.evently.connect($("#account"), $("#flight_medical"), ["loggedIn", "loggedOut"]);
});

function changeMedicalNotes(app, docId, newMedicalNote, user) {
  app.db.openDoc(docId, {
    success : function(doc) {
        doc.medical.review = newMedicalNote;
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

