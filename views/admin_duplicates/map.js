function(doc) {
  if (doc.app_date) {
    emit([doc.type, doc.name.last, doc.name.first, doc.app_date], 1);
  }
}
