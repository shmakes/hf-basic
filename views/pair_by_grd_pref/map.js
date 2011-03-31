function(doc) {
  var ptype = 0;
  var pnotes = "";
  if ((doc.type == "Veteran")
    && (doc.guardian.id == ""))
  {
    ptype = 1;
    pnotes = doc.name.last.toUpperCase();
  }
  else if ((doc.type == "Guardian")
    && (doc.veteran.id == "")
    && (doc.veteran.pref_notes.length > 2)
    && (doc.veteran.pref_notes.toLowerCase() != "none"))
  {
    ptype = 2;
    pnotes = doc.veteran.pref_notes.toUpperCase();
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
