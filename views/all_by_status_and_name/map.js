function(doc) {
  if ((doc.name) && (doc.name.last) && (doc.flight)) {
    var ptype = doc.type;
    var pairing = "N/A";
    if (ptype == "Veteran") {
      pairing = (doc.guardian.name || "None");
    } 
    if (ptype == "Guardian") {
      pairing = "None";
      if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
        pairing = (doc.veteran.pairings[0].name || "None");
      }
    }
    var flt = {};
    if (doc.flight) {
      var flt = doc.flight;
    } 
    emit([(doc.flight.status || ""), 
          doc.name.last
         ], 
         {"type": ptype,
           "name": doc.name.first + " " + doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": doc.app_date,
           "flight": (flt.id || " "),
           "group": (flt.group || " "),
           "pairing": pairing
         });
  }
}
