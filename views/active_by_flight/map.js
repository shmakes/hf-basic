function(doc) {
  if ((doc.flight) && (doc.flight.id)) {
    emit([doc.flight.id, doc.type], null);
  }
}
