function(doc) {
  if ((doc.type == "Veteran") 
      && (doc.flight.status == "Active")
      && (doc.flight.id == "None")
      && (doc.flight.group.length > 0)) {
    emit(doc.flight.group, doc.name.first + " " + doc.name.last);
  }
}
