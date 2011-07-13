function(doc) {
  if (doc.name.last) {
    var ptype = doc.type;
    var pairing = "N/A";
    if (ptype == "Veteran") {
      pairing = (doc.guardian.name || "None");
    } 
    if (ptype == "Guardian") {
      pairing = (doc.veteran.name || "None");
      doc.flight.group = " ";
    }
    emit([(doc.flight.id || ""), 
          doc.name.last
         ], 
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
