function(head, req) {
  var row;
  var headerNeeded = true;
  var pairName = [];
  var pairFirstName = "";
  var pairLastName = "";
  var training = "";
  var paid = "";
  var conflict = "";
  var medNotesExp = "";

  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=FlightInfo.csv"
     }
  });

  while(row = getRow()) {
    pairName = [];
    pairFirstName = "";
    pairLastName = "";
    training = "";    
    paid = "";    
    r = row.doc;
    if (r.type === "Veteran") {
      pairName = r.guardian.name.split(" ");
      conflict = (r.vet_type || "WWII");
      medNotesExp = (r.medical.review || "");
    } else if (r.type === "Guardian") {
      if ((r.veteran) && (r.veteran.pairings) && (r.veteran.pairings.length > 0)) {
        pairName = r.veteran.pairings[0].name.split(" ");
      }

      // Training status
      if (r.flight.training) {
        if (r.flight.training_complete) {
          training = "* ";
        }
        training += r.flight.training;
      }      
      // Paid status
      if (r.flight.paid) {
        paid = "Y";
      } else {
        paid = "N";
      }
      medNotesExp = (r.medical.experience || "");
    }

    // Split the pair name.
    if (pairName.length > 1) {
      pairFirstName = pairName.slice(0,1);
      pairLastName = pairName.slice(1).join(" ");
    } else if (pairName.length === 1) {
      pairLastName = pairName.slice(0,1);
    }

    result = {
        flight_id:                     r.flight.id,
        type:                          r.type,
        app_date:                      r.app_date,
        conflict:                      conflict,
        first_name:                    r.name.first,
        middle_name:                   r.name.middle,
        last_name:                     r.name.last,
        nick_name:                     r.name.nickname,
        addr_street:                   r.address.street,
        addr_city:                     r.address.city,
        addr_county:                   r.address.county,
        addr_state:                    r.address.state,
        addr_zip:                      r.address.zip,
        addr_phone_day:                r.address.phone_day,
        addr_phone_eve:                r.address.phone_eve,
        addr_phone_mbl:                r.address.phone_mbl,
        addr_email:                    r.address.email,
        birth_date:                    r.birth_date,
        gender:                        r.gender,
        shirt_size:                    r.shirt.size,
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
        medical_level:                 (r.medical.level || ""),
        medical_limitations:           (r.medical.limitations || ""),
        medical_notes_exp:             medNotesExp,
        medical_uses_cane:             (r.medical.usesCane || 0),
        medical_uses_walker:           (r.medical.usesWalker || 0),
        medical_uses_wheelchair:       (r.medical.usesWheelchair || 0),
        medical_uses_scooter:          (r.medical.usesScooter || 0),
        medical_is_wheelchair_bound:   (r.medical.isWheelchairBound || 0),
        medical_requires_oxygen:       (r.medical.requiresOxygen || 0),
        pair_first_name:               pairFirstName,
        pair_last_name:                pairLastName,
        flight_bus:                    r.flight.bus.replace("Alpha", "Alpha ").replace("Bravo", "Bravo "),
        id:                            r._id,
        rev:                           r._rev,
        created_at:                    r.metadata.created_at,
        updated_at:                    r.metadata.updated_at,
        created_by:                    r.metadata.created_by,
        updated_by:                    r.metadata.updated_by
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

