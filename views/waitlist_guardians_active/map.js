function(doc) {
  var statuses = ["Active", "Future-Fall", "Future-Spring", "Future-PostRestriction"];
  
  if ((doc.type == "Guardian") 
      && (doc.flight.status == "Active")
      && (statuses.indexOf(doc.flight.status) != -1)
      && (doc.flight.id == "None")
      && (doc.veteran.pairings.length === 0)) {
    emit(doc.app_date, null);
  }
}
