function(head, req) {
  var row;
  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=VeteranInfo.csv"
     }
  });

  var headerNeeded = true;
  while(row = getRow()) {
    r = row.doc;
    result = {
        app_date:              r.app_date,
        conflict:              (r.vet_type || "WWII"),
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
        weight:                r.weight,
        shirt_size:            r.shirt.size,
        service_branch:        r.service.branch,
        service_number:        r.service.service_number,
        service_rank:          r.service.rank,
        service_dates:         r.service.dates,
        service_activity:      r.service.activity,
        ec_relation:           r.emerg_contact.relation,
        ec_name:               r.emerg_contact.name,
        ec_addr_street:        r.emerg_contact.address.street,
        ec_addr_city:          r.emerg_contact.address.city,
        ec_addr_state:         r.emerg_contact.address.state,
        ec_addr_zip:           r.emerg_contact.address.zip,
        ec_addr_phone:         r.emerg_contact.address.phone,
        ec_addr_email:         r.emerg_contact.address.email,
        ac_relation:           r.alt_contact.relation,
        ac_name:               r.alt_contact.name,
        ac_addr_phone:         r.alt_contact.address.phone,
        ac_addr_email:         r.alt_contact.address.email,
        medical_uses_cane:     r.medical.usesCane,
        medical_uses_walker:   r.medical.usesWalker,
        medical_uses_wc:       r.medical.usesWheelchair,
        medical_wc_bound:      r.medical.isWheelchairBound,
        medical_req_oxygen:    r.medical.requiresOxygen,
        medical_limitations:   r.medical.limitations,
        medical_review:        r.medical.review,
        medical_category:      r.medical.category,
        preferred_airport:     r.preferred_airport,
        flight_status:         r.flight.status,
        flight_status_note:    r.flight.status_note,
        flight_confirmed_date: r.flight.confirmed_date,
        flight_confirmed_by:   r.flight.confirmed_by,
        flight_group:          r.flight.group,
        flight_id:             r.flight.id,
        flight_seat:           r.flight.seat,
        flight_bus:            (r.flight.bus ? r.flight.bus.replace("Alpha", "Alpha ").replace("Bravo", "Bravo ") : ""),
        guardian_id:           r.guardian.id,
        guardian_name:         r.guardian.name,
        guardian_pref_notes:   r.guardian.pref_notes,
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
      if (result[key]) {
        if (result[key].length > 0) {
          send("\"");
          send(result[key]);
          send("\"");
        } else {
          if (!isNaN(result[key])) {
            send(result[key].toString());
          }
        }
      }
      send(",");
    }
    send("\n");
  }
}

