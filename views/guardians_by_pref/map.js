function(doc) {
  if (doc.type == "Guardian" 
	    && doc.flight.id == "None"
      && doc.veteran.id == ""
      && doc.veteran.pref_notes.length > 2
      && doc.veteran.pref_notes.toLowerCase() != "none") 
  {
    var words = doc.veteran.pref_notes.toUpperCase().split(" ");
    for (var w in words) {
      if (words[w].length > 2) {
        emit([words[w],
            doc.app_date], 
           { "name"    : doc.name.first + " " + doc.name.last, 
             "pref"    : doc.veteran.pref_notes 
           });
      }
    }
  }
}

