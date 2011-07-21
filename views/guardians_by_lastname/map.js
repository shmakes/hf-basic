function(doc) {
  if ((doc.type == "Guardian") 
      && (doc.flight.id == "None")
      && (doc.veteran.pairings.length < 1)) {
    emit([doc.name.last.toUpperCase(),
          doc.app_date], 
         { "name"    : doc.name.first + " " + doc.name.last, 
           "street"  : doc.address.street, 
           "city"    : doc.address.city
         });
  }
}

