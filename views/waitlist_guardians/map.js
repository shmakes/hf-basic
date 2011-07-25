function(doc) {
  if ((doc.type == "Guardian") 
      && (doc.flight.status == "Active")
      && (doc.flight.id == "None")
      && (doc.veteran.pairings.length === 0)) {
    emit(doc.app_date, null);
  }
}
