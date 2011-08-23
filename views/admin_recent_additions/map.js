function(doc) {
  if ((doc.name) && (doc.name.last)) {
    emit(doc.metadata.created_at, 
       { "type":    doc.type,
         "name":    doc.name.first + " " + doc.name.last, 
         "city":    doc.address.city + ", " + doc.address.state, 
         "appdate": doc.app_date,
         "recdate": doc.metadata.created_at,
         "recby":   doc.metadata.created_by
       });
  }
}
