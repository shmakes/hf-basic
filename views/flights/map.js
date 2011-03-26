function(doc) {
  if (doc.type == "Flight") {
    emit([doc.flight_date, doc.name], null);
  }
}
