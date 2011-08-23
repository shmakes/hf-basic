function(doc) {
  if ((doc.name) && (doc.name.last)) {
    emit(doc.metadata.updated_at, 
       { "type":    doc.type,
         "name":    doc.name.first + " " + doc.name.last, 
         "city":    doc.address.city + ", " + doc.address.state, 
         "appdate": doc.app_date,
         "recdate": doc.metadata.updated_at,
         "recby":   doc.metadata.updated_by
       });
  }
}
