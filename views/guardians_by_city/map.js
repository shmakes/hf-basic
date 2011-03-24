function(doc) {
  if (doc.type == "Guardian" 
	&& doc.flight.id == "None"
        && doc.veteran.id == "") {
    emit([doc.address.state.toUpperCase(),
          doc.address.county.toUpperCase(),
          doc.address.city.toUpperCase(),
          doc.app_date], 
         [doc.name.last, doc.name.first]);
  }
}

//Same city: http://localhost:5984/hf/_design/basic/_view/guardians_by_city?limit=50&startkey=["WI","OZAUKEE","MEQUON"]&endkey=["WI","OZAUKEE","MEQUON\ufff0"] 

