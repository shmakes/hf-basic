function(doc) {
  if (doc.type == "Guardian" 
	&& doc.flight.id == "None"
        && doc.veteran.id == "") {
    emit([doc.address.zip,
          doc.app_date], 
         [doc.name.last, doc.name.first]);
  }
}

//Same zip: http://localhost:5984/hf/_design/basic/_view/guardians_by_zip?limit=50&startkey=["53092"]&endkey=["53092\ufff0"]

