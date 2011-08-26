function(doc) {
  if ((doc.flight) && (doc.flight.history) && (doc.flight.history.length > 0)) {
    var hst = doc.flight.history[doc.flight.history.length -1];
    var byLoc = hst.change.lastIndexOf("by:");
    var usr = hst.change.substr(byLoc + 4);
    emit(hst.id, 
       { "type":    doc.type,
         "name":    doc.name.first + " " + doc.name.last, 
         "city":    doc.address.city + ", " + doc.address.state, 
         "appdate": doc.app_date,
         "recdate": hst.id,
         "recby":   usr
       });
  }
}
