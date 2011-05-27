function(head, req) {
  var row;
  start({
    "headers": {
      //"Content-Type": "text/plain"
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=VeteranInfo.csv"
     }
  });
  send("\"First Name\", ");
  send("\"Middle Name\", ");
  send("\"Nick Name\", ");
  send("\"Last Name\", ");

  send("\"Home Street\", ");
  send("\"Home City\", ");
  send("\"Home County\", ");
  send("\"Home State\", ");
  send("\"Home Zip\", ");
  send("\"Home Phone\", ");
  send("\"Home Email\", ");

  send("\"App Date\", ");
  send("\"Age\", ");
  send("\"Birth Date\", ");
  send("\"Gender\"");

  send("\n");
  while(row = getRow()) {
    send("\"");
    send(row.value.name.first);
    send("\",\"");
    send(row.value.name.middle);
    send("\",\"");
    send(row.value.name.nickname);
    send("\",\"");
    send(row.value.name.last);

    send("\",\"");
    send(row.value.address.street);
    send("\",\"");
    send(row.value.address.city);
    send("\",\"");
    send(row.value.address.county);
    send("\",\"");
    send(row.value.address.state);
    send("\",\"");
    send(row.value.address.zip);
    send("\",\"");
    send(row.value.address.phone_day);
    send("\",\"");
    send(row.value.address.email);

    send("\",\"");
    send(row.value.app_date);
    send("\",\"");
    send(row.value.age);
    send("\",\"");
    if (row.value.birth_date) {
      send(row.value.birth_date);
    } else {
      send(row.value.birth_date_string);
    }
    send("\",\"");
    send(row.value.gender);

    send("\"\n");
  }
}

