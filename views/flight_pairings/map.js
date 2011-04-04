function(doc) {
  if (doc.name.last) {
    var ptype = doc.type;
    var pairing = "N/A";
    if (ptype == "Veteran") {
      listing = doc._id,
      pt = 0;
      pairing = (doc.guardian.id || "");
      pairName = (doc.guardian.name || "");
      pairPref = (doc.guardian.pref_notes || "");
    } 
    if (ptype == "Guardian") {
      listing = (doc.veteran.id || ""),
      pt = 1;
      pairing = listing;
      pairName = (doc.veteran.name || "");
      pairPref = (doc.veteran.pref_notes || "");
    }
    emit([(doc.flight.id || "None"), 
           listing, pt],
         {"type": ptype,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": doc.app_date,
           "flight": (doc.flight.id || "None"),
           "group": (doc.flight.group || "N/A"),
           "seat": (doc.flight.seat || ""),
           "pairing": pairing,
           "pairName": pairName,
           "pairPref": pairPref
         });
  }
}

