function(doc) {
  if ((doc.type == "Veteran") 
      && (doc.flight.status == "Active")
      && (doc.flight.id !== "None")) {
    var flight = doc.flight.id;
    var destination = (doc.homecoming && doc.homecoming.destination) ? doc.homecoming.destination : "";
    emit([flight, destination], 1);
  }
}
