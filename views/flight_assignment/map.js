function(doc) {
  if (doc.name.last) {
    var ptype = doc.type;
    if (ptype == "Veteran") {
      listing = doc._id,
      pt = 0;
    } 
    if (ptype == "Guardian") {
      listing = (doc.veteran.id || doc._id),
      pt = 1;
    }
    emit([(doc.flight.id || "None"), 
           listing, pt],
         { "pair": listing,
           "type": ptype,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": (doc.app_date || "")
         });
  }
}

