function(doc) {
  if ((doc.type == "Veteran") 
      && (doc.flight.status == "Active")
      && (doc.flight.group.length > 0)) {
    var onFlight = "";
    if (doc.flight.id !== "None") {
      onFlight = " (" + doc.flight.id + ")";
    }
    emit(doc.flight.group, doc.name.first + " " + doc.name.last + onFlight);
  }
}
