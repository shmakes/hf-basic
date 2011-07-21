function(doc) {
  if ((doc.type == "Guardian") 
      && (doc.veteran.pairings.length < 1)) {
    emit([doc.flight.id,
          doc.address.state.toUpperCase(),
          doc.address.county.toUpperCase(),
          doc.address.city.toUpperCase(),
          doc.app_date], 
         { "name"    : doc.name.first + " " + doc.name.last, 
           "street"  : doc.address.street, 
           "zip"     : doc.address.zip
         });

  }
}

//Same city: http://localhost:5984/hf/_design/basic/_view/guardians_by_city?limit=50&startkey=["WI","OZAUKEE","MEQUON"]&endkey=["WI","OZAUKEE","MEQUON\ufff0"] 

