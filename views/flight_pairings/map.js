function(doc) {
  flt = {};
  if (doc.flight) {
    flt = doc.flight;
  }
  if (doc.type == "Veteran") {
    emit([(flt.id || "None"), 
           doc._id, 0],
         {"type": doc.type,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": (doc.app_date || ""),
           "bus": (flt.bus || "None"),
           "seat": (flt.seat || ""),
           "pairing": (doc.guardian.id || ""),
           "pairPref": (doc.guardian.pref_notes || "")
         });
  } else if (doc.type == "Guardian") {
    if (doc.veteran.pairings) {
      for (vet in doc.veteran.pairings) {
        emit([(flt.id || "None"), 
               doc.veteran.pairings[vet].id, 1],
             {"type": doc.type,
               "id": doc._id, 
               "name_first": doc.name.first, 
               "name_last": doc.name.last, 
               "city": doc.address.city + ", " + doc.address.state, 
               "appdate": (doc.app_date || ""),
               "bus": (flt.bus || "None"),
               "seat": (flt.seat || ""),
               "pairing": (doc.veteran.pairings[vet].id || ""),
               "pairPref": (doc.veteran.pref_notes || "")
             });
      }
    }
  }
}

