function(doc) {
  if ((doc.type == "Flight") && (!doc.completed)) {
    var fdt = new Date(doc.flight_date.replace(/-/g, "/"));
    var now = new Date();
    if (fdt > now) {
      emit([doc.flight_date, doc.name], null);
    }
  }
}
