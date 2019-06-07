function(doc) {
  var flt = {};
  var confirmed = "unconfirmed";
  var nofly = "";
  if (doc.flight) {
    flt = doc.flight;
    if (flt.confirmed_date) {
      confirmed = "";
    }
    if (flt.nofly) {
      nofly = "nofly";
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
           "med_limits": "[" + (doc.medical.level || " ") + "/" + (doc.medical.alt_level || " ") + "] " + (doc.medical.limitations || ""),
           "group": (flt.group || " "),
           "bus": (flt.bus || "None"),
           "seat": (flt.seat || ""),
           "shirt": (doc.shirt.size || ""),
           "confirmed": confirmed,
           "nofly": nofly,
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
               "training": (flt.training || "") + " [" + (doc.medical.level || " ") + "]",
               "training_complete": flt.training_complete,
               "bus": (flt.bus || "None"),
               "seat": (flt.seat || ""),
               "shirt": (doc.shirt.size || ""),
               "confirmed": confirmed,
               "nofly": nofly,
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
             "training": (flt.training || "") + " [" + (doc.medical.level || " ") + "]",
             "training_complete": flt.training_complete,
             "bus": (flt.bus || "None"),
             "seat": (flt.seat || ""),
             "shirt": (doc.shirt.size || ""),
             "confirmed": confirmed,
             "nofly": nofly,
             "pairing": ""
           });
    }
  }
}

