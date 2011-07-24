function(doc) {
  if ((doc.name) && (doc.name.last)) {
    emit(doc.metadata.updated_at, 
    [doc.type, doc.name.first + ' ' + doc.name.last, doc.metadata.updated_by]);
  }
}
