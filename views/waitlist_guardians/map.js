function(doc) {
  if ((doc.type == "Guardian") 
      && (doc.flight.status == "Active")
      && (doc.flight.id == "None")) {
    emit(doc.app_date, null);
  }
}
