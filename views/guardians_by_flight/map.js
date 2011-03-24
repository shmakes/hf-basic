function(doc) {
  if (doc.type == "Guardian") {
    emit([doc.flight.id, doc.veteran.id, doc.app_date],
         [doc.name.last, 
          doc.name.first,
          doc.address.street,
          doc.address.city,
          doc.address.county]);
  }
}

//Waiting: http://localhost:5984/hf/_design/basic/_view/guardians_by_flight?limit=50&startkey=["None",""]&endkey=["None\ufff0","a",{}]

