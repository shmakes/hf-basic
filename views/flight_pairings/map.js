function(doc) {
  if (doc.name.last) {
    var ptype = doc.type;
    var pairing = "N/A";
    if (ptype == "Veteran") {
      listing = doc._id,
      pairing = (doc.guardian.id || "");
      pairName = (doc.guardian.name || "");
    } 
    if (ptype == "Guardian") {
      listing = (doc.veteran.id || ""),
      pairing = listing;
      pairName = (doc.veteran.name || "");
    }
    emit([(doc.flight.id || ""), 
           listing,
           doc.flight.group, 
           doc.flight.seat],
         [{"type": ptype,
           "name": doc.name.first + " " + doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": doc.app_date,
           "flight": (doc.flight.id || "Waiting"),
           "group": (doc.flight.group || "N/A"),
           "pairing": pairing,
           "pairName": pairName
         }]);
  }
}

