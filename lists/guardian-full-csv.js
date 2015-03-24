function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=GuardianInfo.csv"
     }
  });

  var headerNeeded = true;
  while(row = getRow()) {
    r = row.doc;

    vetId = "";
    vetName = "";
    for (vetIdx in r.veteran.pairings) {
      vetId +=   " | " + r.veteran.pairings[vetIdx].id;
      vetName += " | " + r.veteran.pairings[vetIdx].name;
    }
    result = {
        app_date:              r.app_date,
        first_name:            r.name.first,
        middle_name:           r.name.middle,
        last_name:             r.name.last,
        nick_name:             r.name.nickname,
        addr_street:           r.address.street,
        addr_city:             r.address.city,
        addr_county:           r.address.county,
        addr_state:            r.address.state,
        addr_zip:              r.address.zip,
        addr_phone_day:        r.address.phone_day,
        addr_phone_eve:        r.address.phone_eve,
        addr_phone_mbl:        r.address.phone_mbl,
        addr_email:            r.address.email,
        age:                   r.age,
        birth_date:            r.birth_date,
        gender:                r.gender,
        shirt_size:            r.shirt.size,
        notes_other:           r.notes.other,
        notes_previous_hf:     r.notes.previous_hf,
        notes_service:         r.notes.service,
        flight_status:                 r.flight.status,
        flight_status_note:            r.flight.status_note,
        flight_confirmed_date:         r.flight.confirmed_date,
        flight_confirmed_by:           r.flight.confirmed_by,
        flight_training:               training,
        flight_training_notes:         r.flight.training_notes,
        flight_paid:                   paid,
        flight_seat:                   r.flight.seat,
        flight_group:                  (r.flight.group || ""),
        flight_waiver:                 (r.flight.waiver || ""),
        flight_books_ordered:          (r.flight.booksOrdered || ""),
        media_ok:                      (r.media_ok || ""),
        medical_release:               (r.medical.release || ""),
        medical_limitations:           (r.medical.limitations || ""),
        medical_notes_exp:             medNotesExp,
        medical_uses_cane:             (r.medical.usesCane || 0),
        medical_uses_walker:           (r.medical.usesWalker || 0),
        medical_uses_wheelchair:       (r.medical.usesWheelchair || 0),
        medical_uses_scooter:          (r.medical.usesScooter || 0),
        medical_is_wheelchair_bound:   (r.medical.isWheelchairBound || 0),
        medical_requires_oxygen:       (r.medical.requiresOxygen || 0),
        veteran_id:            vetId.substr(2),
        veteran_name:          vetName.substr(2),
        veteran_pref_notes:    r.veteran.pref_notes,
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
