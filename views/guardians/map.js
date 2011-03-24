function(doc) {
  if (doc.type == "Guardian") {
    emit(doc.app_date, doc);
  }
}
