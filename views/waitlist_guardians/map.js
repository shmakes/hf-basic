function(doc) {
  var statuses = ["Active", "Future-Fall", "Future-Spring"];
  
  if ((doc.type == "Guardian") 
      && (statuses.indexOf(doc.flight.status) != -1)
      && (doc.flight.id == "None")
      && (doc.veteran.pairings.length === 0)) {
    emit(doc.app_date, null);
  }
}
