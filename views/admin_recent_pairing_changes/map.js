function(doc) {
  var pair;
  var usr = "";
  var change = "";
  if (doc.type === "Veteran") {
    pair = doc.guardian;
  }
  if (doc.type === "Guardian") {
    pair = doc.veteran;
  }
  if ((pair) && (pair.history) && (pair.history.length > 0)) {
    var hst = pair.history[pair.history.length -1];
    var byLoc = hst.change.lastIndexOf("by:");
    if (byLoc > 1) {
      usr = hst.change.substr(byLoc + 4);
      change = hst.change.substring(0, byLoc - 1);
    }
    emit(hst.id, 
       { "type":    doc.type,
         "name":    doc.name.first + " " + doc.name.last, 
         "city":    doc.address.city + ", " + doc.address.state, 
         "appdate": doc.app_date,
         "recdate": hst.id,
         "recby":   usr,
         "change":  change
       });
  }
}
