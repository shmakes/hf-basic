function(doc) {
  if (doc.name.last) {
    if (!doc.flight) {
      doc.flight = {};
    }
    var ptype = doc.type;
    var pairing = "N/A";
    if (ptype == "Veteran") {
      pairing = (doc.guardian.name || "None");
    } 
    if (ptype == "Guardian") {
      pairing = (doc.veteran.name || "None");
      doc.flight.group = " ";
    }
    if (ptype == "Volunteer") {
      doc.flight.id = " ";
      doc.flight.group = " ";
    }
    emit([doc.name.last], 
         {"type": ptype,
           "name": doc.name.first + " " + doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": doc.app_date,
           "flight": (doc.flight.id || " "),
           "group": (doc.flight.group || " "),
           "pairing": pairing
         });
  }
}
