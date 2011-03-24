function(doc) {
  if (doc.type == "Flight") {
    emit([doc.name], null);
  }
}
