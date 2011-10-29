function(doc) {
  if ((doc.flight) && (doc.flight.id) && (doc.flight.status === "Active")) {
    emit([doc.flight.id, doc.type], doc);
  }
}
