function(doc) {
  if (doc.type == "Volunteer") {
    emit(doc.app_date, doc);
  }
}
