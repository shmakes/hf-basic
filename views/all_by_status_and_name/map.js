function(doc) {
  if ((doc.name) && (doc.name.last) && (doc.flight)) {
    var ptype = doc.type;
    var pairing = "-";
    if (ptype == "Veteran") {
      pairing = (doc.guardian.name || "None");
    } 
    if (ptype == "Guardian") {
      pairing = "None";
      if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
        pairing = (doc.veteran.pairings[0].name || "None");
      }
    }
    emit([(doc.flight.status || ""), 
          doc.name.last.replace(/['\. ]/g, '')
         ], 
         {"type": ptype,
           "name": doc.name.first + " " + doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": doc.app_date,
           "flight": (doc.flight.id || "-"),
           "status": (doc.flight.status || "-"),
           "pairing": pairing
         });
  }
}
