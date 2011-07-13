function(doc) {
  if (doc.name.last) {
    emit(doc.metadata.created_at, 
    [doc.type, doc.name.first + ' ' + doc.name.last, doc.metadata.created_by]);
  }
}
