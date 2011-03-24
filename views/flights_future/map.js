function(doc) {
  var fdt = new Date(doc.flight_date);
  var now = new Date();
  if ((doc.type == "Flight") 
    && (fdt > now)
    && (!doc.completed)) {
    emit([doc.name], null);
  }
}
