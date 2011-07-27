function(doc) {
  if ((doc.type == "Veteran") 
      && (doc.guardian.id === "")) {
    emit([doc.flight.status, doc.name.last.toUpperCase()], { 
      "name": doc.name.first + " " + doc.name.last,
      "city": doc.address.city + ", " + doc.address.state,
      "flight": doc.flight.id,
      "prefs": doc.guardian.pref_notes
    });
  }
}
