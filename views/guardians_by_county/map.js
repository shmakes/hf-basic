function(doc) {
  if (doc.type == "Guardian" 
	&& doc.flight.id == "None"
        && doc.veteran.id == "") {
    emit([doc.address.state.toUpperCase(),
          doc.address.county.toUpperCase(),
          doc.app_date], 
         [doc.name.last, 
          doc.name.first,
          doc.address.street,
          doc.address.city]);
  }
}

//Same county:  http://localhost:5984/hf/_design/basic/_view/guardians_by_county?limit=50&startkey=["WI","OZAUKEE"]&endkey=["WI","OZAUKEE\ufff0"]

