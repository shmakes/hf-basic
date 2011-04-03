function(doc) {
  var ptype = 0;
  var pnotes = "";
  if ((doc.type == "Veteran")
    && (doc.guardian.id == "")
    && (doc.guardian.pref_notes.length > 2))
  {
    ptype = 1;
    pnotes = doc.guardian.pref_notes.toUpperCase();
  }
  else if ((doc.type == "Guardian")
    && (doc.veteran.id == ""))
  {
    ptype = 2;
    pnotes = doc.name.last.toUpperCase();
  }
  if (ptype > 0) {
    var words = pnotes.split(" ");
    for (var w in words) {
      if (words[w].length > 2) {
        emit([doc.flight.id, words[w], doc.app_date, ptype],
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
}