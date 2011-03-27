function(doc) {
  var fdt = new Date(doc.flight_date);
  var now = new Date();
  if ((doc.type == "Flight") 
    && (fdt > now)
    && (!doc.completed)) {
    emit([doc.flight_date, doc.name], null);
  }
}
