function(doc) {
  var ptype = 0;
  var compare = "";
  var pref = "";
  if ((doc.type == "Veteran")
    && (doc.flight.status == "Active")
    && (doc.guardian.id == "")
    && (doc.guardian.pref_notes.length > 2))
  {
    ptype = 1;
    compare = doc.guardian.pref_notes.replace(/,/g, " ").replace(/\./g, " ").replace(/-/g," ").replace(/\//g," ").toUpperCase();
    pref = doc.guardian.pref_notes;
  }
  else if ((doc.type == "Guardian")
    && (doc.flight.status == "Active")
    && (doc.veteran.pairings.length < 1))
  {
    ptype = 2;
    compare = doc.name.last.toUpperCase();
    pref = doc.veteran.pref_notes;
  }
  if (ptype > 0) {
    var words = compare.split(" ");
    for (var w in words) {
      if (words[w].length > 2) {
        emit([words[w], ptype],
             {"type": doc.type,
               "id": doc._id, 
               "name_first": doc.name.first, 
               "name_last": doc.name.last, 
               "city": doc.address.city + ", " + doc.address.state, 
               "pref": pref
             });
      }
    }
  }
}
