function(doc) {
  if (doc.type == "Guardian" 
	    && doc.flight.id == "None"
      && doc.veteran.id == "") 
  {
    emit([doc.address.zip,
          doc.app_date], 
         { "name"    : doc.name.first + " " + doc.name.last, 
           "street"  : doc.address.street, 
           "city"    : doc.address.city
         });
  }
}

//Same zip: http://localhost:5984/hf/_design/basic/_view/guardians_by_zip?limit=50&startkey=["53092"]&endkey=["53092\ufff0"]

