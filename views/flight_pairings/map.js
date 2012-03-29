function(doc) {
  var flt = {};
  var confirmed = "unconfirmed";
  if (doc.flight) {
    flt = doc.flight;
    if (flt.confirmed_date) {
      confirmed = "";
    }
  }
  if (doc.type == "Veteran") {
    emit([(flt.id || "None"), 
           doc._id, 0],
         {"type": doc.type,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "med_limits": (doc.medical.limitations || ""),
           "bus": (flt.bus || "None"),
           "seat": (flt.seat || ""),
           "confirmed": confirmed,
           "pairing": (doc.guardian.id || "")
         });
  } else if (doc.type == "Guardian") {
    if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
      for (vet in doc.veteran.pairings) {
        emit([(flt.id || "None"), 
               doc.veteran.pairings[vet].id, 1],
             {"type": doc.type,
               "id": doc._id, 
               "name_first": doc.name.first, 
               "name_last": doc.name.last, 
               "city": doc.address.city + ", " + doc.address.state, 
               "med_exprnc": (doc.medical.experience || ""),
               "training": (flt.training || ""),
               "training_complete": flt.training_complete,
               "bus": (flt.bus || "None"),
               "seat": (flt.seat || ""),
               "confirmed": confirmed,
               "pairing": (doc.veteran.pairings[vet].id || "")
             });
      }
    } else {
      emit([(flt.id || "None"), 
             doc._id, 1],
           {"type": doc.type,
             "id": doc._id, 
             "name_first": doc.name.first, 
             "name_last": doc.name.last, 
             "city": doc.address.city + ", " + doc.address.state, 
             "med_exprnc": (doc.medical.experience || ""),
             "training": (flt.training || ""),
             "training_complete": flt.training_complete,
             "bus": (flt.bus || "None"),
             "seat": (flt.seat || ""),
             "confirmed": confirmed,
             "pairing": ""
           });
    }
  }
}

