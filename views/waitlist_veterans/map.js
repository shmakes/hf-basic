function(doc) {
  if ((doc.type == "Veteran") 
      && (doc.flight.status == "Active")
      && (doc.flight.id == "None")) {
    emit(doc.app_date, null);
  }
}
