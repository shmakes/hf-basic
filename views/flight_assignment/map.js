function(doc) {
  if (doc.type == "Veteran") {
    emit([(doc.flight.id || "None"), 
           doc._id, 0],
         { "pair": doc._id,
           "type": doc.type,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": (doc.app_date || "")
         });
  } else if (doc.type == "Guardian") {
    if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
      for (vet in doc.veteran.pairings) {
        emit([(doc.flight.id || "None"), 
               doc.veteran.pairings[vet].id, 1],
             { "pair": doc.veteran.pairings[vet].id,
               "type": doc.type,
               "id": doc._id, 
               "name_first": doc.name.first, 
               "name_last": doc.name.last, 
               "city": doc.address.city + ", " + doc.address.state, 
               "appdate": (doc.app_date || "")
             });
      }
    } else {
      emit([(doc.flight.id || "None"), 
             doc._id, 1],
           { "pair": doc._id,
             "type": doc.type,
             "id": doc._id, 
             "name_first": doc.name.first, 
             "name_last": doc.name.last, 
             "city": doc.address.city + ", " + doc.address.state, 
             "appdate": (doc.app_date || "")
           });
    }
  }
}

