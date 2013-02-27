function(doc) {
  if ((doc.type == "Veteran") 
      && (doc.flight.status == "Active")
      && (doc.flight.id == "None")) {
    var conflict = ["WWII", "Korea", "Vietnam", "Afghanistan", "Iraq"];
    emit(conflict.indexOf((doc.vet_type || 'WWII')) + "-" + doc.app_date, doc.flight.group);
  }
}
