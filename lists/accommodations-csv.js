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
  var serviceActivity = ""

  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=Accommodations.csv"
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

    if (!r.apparel) {
      r.apparel = {};
    }
    
    if (!r.accommodations) {
      r.accommodations = {};
    }
    
    if (!r.homecoming) {
      r.homecoming = {};
    }

    if (!r.call) {
      r.call = {};
    }
    
    if (!r.alt_contact) {
      r.alt_contact = {};
    }
    
    if (!r.alt_contact.address) {
      r.alt_contact.address = {};
    }
    
    if (r.service && r.service.activity) {
      serviceActivity = r.service.activity.replace(/\"/g, "''");
    } else {
      serviceActivity = "";
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
        call_assigned_to:              (r.call.assigned_to || ""),
        call_fm_number:                (r.call.fm_number || ""),
        call_mail_sent:                (r.call.mail_sent  || false),
        call_email_sent:               (r.call.email_sent || false),
        flight_status:                 r.flight.status,
        flight_status_note:            r.flight.status_note,
        flight_confirmed_date:         r.flight.confirmed_date,
        flight_confirmed_by:           r.flight.confirmed_by,
        flight_training:               training,
        flight_training_notes:         r.flight.training_notes,
        flight_paid:                   paid,
        flight_seat:                   r.flight.seat,
        flight_nofly:                  (r.flight.nofly || false),
        flight_group:                  (r.flight.group || ""),
        service_branch:                ((r.service && r.service.branch) || ""),
        service_rank:                  ((r.service && r.service.rank) || ""),
        service_dates:                 ((r.service && r.service.dates) || ""),
        service_activity:              serviceActivity,
        pair_first_name:               pairFirstName,
        pair_last_name:                pairLastName,
        accomm_arrival_date:           (r.accommodations.arrival_date || ""),
        accomm_arrival_time:           (r.accommodations.arrival_time || ""),
        accomm_arrival_flight:         (r.accommodations.arrival_flight || ""),
        accomm_hotel_name:             (r.accommodations.hotel_name || ""),
        accomm_room_type:              (r.accommodations.room_type || ""),
        accomm_attend_banquette:       (r.accommodations.attend_banquette || ""),
        accomm_banquette_guest:        (r.accommodations.banquette_guest || ""),
        accomm_departure_date:         (r.accommodations.departure_date || ""),
        accomm_departure_time:         (r.accommodations.departure_time || ""),
        accomm_departure_flight:       (r.accommodations.departure_flight || ""),
        accomm_notes:                  (r.accommodations.notes || ""),
        apparel_item:                  (r.apparel.item || ""),
        apparel_jacket_size:           (r.apparel.jacket_size || ""),
        apparel_shirt_size:            (r.apparel.shirt_size || ""),
        apparel_date:                  (r.apparel.date || ""),
        apparel_delivery:              (r.apparel.delivery || ""),
        apparel_notes:                 (r.apparel.notes || ""),
        apparel_by:                    (r.apparel.by || ""),
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
          send(result[key].toString().trim());
          send("\"");
        } else {
          if (!isNaN(result[key])) {
            send(result[key].toString().trim());
          }
        }
      }
      send(",");
    }
    send("\n");
  }

}
