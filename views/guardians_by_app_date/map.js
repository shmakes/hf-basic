function(doc) {
  if ((doc.type == "Guardian") 
      && (doc.veteran.pairings.length < 1)) {
    emit([doc.flight.id, doc.app_date], 
         { "name"    : doc.name.first + " " + doc.name.last, 
           "street"  : doc.address.street, 
           "city"    : doc.address.city
         });
  }
}

//By application date:  http://localhost:5984/hf/_design/basic/_view/guardians_by_app_date?limit=50&startkey=["None"]&endkey=["None\ufff0"]

