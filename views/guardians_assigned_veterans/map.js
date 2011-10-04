function(doc) {
  if ((doc.type === "Veteran") && (doc.flight.status === "Active") && (doc.flight.id.length > 4) && (doc.guardian.id.length > 0)) {
    emit([(doc.flight.id || "None"), 
           doc._id, 0],
         { "pair": doc._id,
           "type": doc.type,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "street": doc.address.street,
           "city": doc.address.city,
           "state": doc.address.state, 
           "zip": doc.address.zip,
           "phone_day": doc.address.phone_day,
           "phone_eve": doc.address.phone_eve,
           "phone_mbl": doc.address.phone_mbl
         });
  } else if ((doc.type === "Guardian") && (doc.flight.status === "Active") && (doc.flight.id.length > 4)) {
    if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
      for (vet in doc.veteran.pairings) {
        emit([(doc.flight.id || "None"), 
               doc.veteran.pairings[vet].id, 1],
             { "pair": doc.veteran.pairings[vet].id,
               "type": doc.type,
               "id": doc._id, 
               "name_first": doc.name.first, 
               "name_last": doc.name.last, 
               "street": doc.address.street,
               "city": doc.address.city,
               "state": doc.address.state, 
               "zip": doc.address.zip,
               "phone_day": doc.address.phone_day,
               "phone_eve": doc.address.phone_eve,
               "phone_mbl": doc.address.phone_mbl
             });
      }
    }   
  }
}

