function(doc) {
  if (doc.name.last) {
    emit(doc.metadata.updated_at, 
    [doc.name.first + ' ' + doc.name.last, doc.metadata.updated_by]);
  }
}
