function(doc) {
  var pair;
  if (doc.type === "Veteran") {
    pair = doc.guardian;
  }
  if (doc.type === "Guardian") {
    pair = doc.veteran;
  }
  if ((pair.history) && (pair.history.length > 0)) {
    var hst = pair.history[pair.history.length -1];
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
