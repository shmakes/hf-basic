function(doc) {
  var statuses = ["Active", "Future-Fall", "Future-Spring", "Future-PostRestriction"];
  var conflictOrder = {"WWII": 1, "Korea": 2, "Vietnam": 3, "Afghanistan": 3, "Iraq": 3, "Other": 3};

  if ((doc.type == "Veteran") 
      && (statuses.indexOf(doc.flight.status) != -1)
      && (doc.flight.id == "None")) {
    emit((conflictOrder[(doc.vet_type || 'WWII')] || 3) + "-" + doc.app_date, doc.flight.group);
  }
}
