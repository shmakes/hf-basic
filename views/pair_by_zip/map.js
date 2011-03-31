function(doc) {
  if (doc.name.last) {
    var ptype = 0;
    if ((doc.type == "Veteran")
      && (doc.guardian.id == "")) {
      ptype = 1;
    } else if ((doc.type == "Guardian")
        && (doc.veteran.id == "")) {
      ptype = 2;
    }
    if (ptype > 0) {
      emit([doc.flight.id, doc.address.zip.substr(0, 5), doc.app_date, ptype],
           {"type": doc.type,
             "id": doc._id, 
             "name_first": doc.name.first, 
             "name_last": doc.name.last, 
             "street": doc.address.street, 
             "city": doc.address.city, 
             "state": doc.address.state, 
             "county": doc.address.county
           });
    }
  }
}

