function(doc) {
  if (doc.type == "Veteran" && doc.flight.id) {
    emit([doc.flight.id, doc.app_date], [doc.name.last, doc.name.first]);
  }
}
