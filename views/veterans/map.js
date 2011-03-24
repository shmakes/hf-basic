function(doc) {
  if (doc.type == "Veteran") {
    emit(doc.app_date, doc);
  }
}
