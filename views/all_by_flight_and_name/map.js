function(doc) {
  if ((doc.name) && (doc.name.last)) {
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
    var flt = {};
    if (doc.flight) {
      var flt = doc.flight;
    } 
    emit([(flt.id || ""), 
          doc.name.last
         ], 
         {"type": ptype,
           "name": doc.name.first + " " + doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": doc.app_date,
           "flight": (flt.id || "-"),
           "status": (flt.status || "-"),
           "pairing": pairing
         });
  }
}
