function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=VolunteerInfo.csv"
     }
  });

  var headerNeeded = true;
  while(row = getRow()) {
    r = row.value;
    result = {
        app_date:              r.app_date,
        first_name:            r.name.first,
        middle_name:           r.name.middle,
        last_name:             r.name.last,
        nick_name:             r.name.nickname,
        addr_street:           r.address.street,
        addr_city:             r.address.city,
        addr_state:            r.address.state,
        addr_zip:              r.address.zip,
        addr_phone_day:        r.address.phone_day,
        addr_phone_eve:        r.address.phone_eve,
        addr_phone_mbl:        r.address.phone_mbl,
        addr_email:            r.address.email,
        birth_date:            r.birth_date,
        shirt_size:            (r.shirt) ? r.shirt.size : "",
        notes_other:           r.notes.other,
        id:                    r._id,
        rev:                   r._rev,
        created_at:            r.metadata.created_at,
        updated_at:            r.metadata.updated_at,
        created_by:            r.metadata.created_by,
        updated_by:            r.metadata.updated_by
    }

    if (headerNeeded) {
      for (key in result) {
        send("\"");
        send(key);
        send("\",");
      }
      send("\n");
      headerNeeded = false;
    }

    for (key in result) {
      if ((result[key]) && (result[key].length > 0)) {
        send("\"");
        send(result[key]);
        send("\"");
      }
      send(",");
    }
    send("\n");
  }
}
