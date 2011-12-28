function(doc) {
  if ((doc.type) && (doc.app_date)) {
    emit([doc.type, doc.app_date], null);
  }
}
