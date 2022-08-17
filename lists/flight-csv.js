function(head, req) {
  var row;
  var headerNeeded = true;
  var pairName = [];
  var pairFirstName = "";
  var pairLastName = "";
  var training = "";
  var paid = "";
  var grdTrainStatus = {};
  var conflict = "";
  var medNotesExp = "";
  var serviceActivity = ""

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

      // Paid status
      if (r.flight.paid) {
        paid = "Y";
      } else {
        paid = "N";
      }
      medNotesExp = (r.medical.experience || "");
    }

    // Training status
    if (r.flight.training) {
      if (r.flight.training_complete) {
        training = "* ";
      }
      training += r.flight.training;
      grdTrainStatus[r._id] = training;
    } else {
      if (r.guardian && r.guardian.id) {
        if (r.guardian.id in grdTrainStatus) {
          training = grdTrainStatus[r.guardian.id];
        }
      }
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
        flight_waiver:                 (r.flight.waiver || ""),
        flight_media_waiver:           (r.flight.mediaWaiver || ""),
        flight_books_ordered:          (r.flight.booksOrdered || ""),
        media_ok:                      (r.media_ok || ""),
        media_newspaper_ok:            (r.media_newspaper_ok || ""),
        media_interview_ok:            (r.media_interview_ok || ""),
        medical_release:               (r.medical.release || ""),
        medical_form:                  (r.medical.form || ""),
        medical_level:                 (r.medical.level || ""),
        medical_alt_level:             (r.medical.alt_level || ""),
        medical_limitations:           (r.medical.limitations || ""),
        medical_exam_required:         (r.medical.examRequired || ""),
        medical_notes_exp:             medNotesExp,
        medical_uses_cane:             (r.medical.usesCane || 0),
        medical_uses_walker:           (r.medical.usesWalker || 0),
        medical_uses_wheelchair:       (r.medical.usesWheelchair || 0),
        medical_uses_scooter:          (r.medical.usesScooter || 0),
        medical_is_wheelchair_bound:   (r.medical.isWheelchairBound || 0),
        medical_requires_oxygen:       (r.medical.requiresOxygen || 0),
        service_branch:                ((r.service && r.service.branch) || ""),
        service_rank:                  ((r.service && r.service.rank) || ""),
        service_dates:                 ((r.service && r.service.dates) || ""),
        service_activity:              serviceActivity,
        mail_call_name:                ((r.mail_call && r.mail_call.name) || ""),
        mail_call_phone:               ((r.mail_call && r.mail_call.address.phone) || ""),
        mail_call_email:               ((r.mail_call && r.mail_call.address.email) || ""),
        mail_call_received:            ((r.mail_call && r.mail_call.received) || ""),
        mail_call_adopt:               ((r.mail_call && r.mail_call.adopt) || ""),
        mail_call_notes:               ((r.mail_call && r.mail_call.notes) || ""),
        pair_first_name:               pairFirstName,
        pair_last_name:                pairLastName,
        flight_bus:                    r.flight.bus.replace("Alpha", "Alpha ").replace("Bravo", "Bravo "),
        homecoming_destination:        (r.homecoming.destination || ""),
        apparel_item:                  (r.apparel.item || ""),
        apparel_jacket_size:           (r.apparel.jacket_size || ""),
        apparel_shirt_size:            (r.apparel.shirt_size || ""),
        apparel_date:                  (r.apparel.date || ""),
        apparel_delivery:              (r.apparel.delivery || ""),
        apparel_notes:                 (r.apparel.notes || ""),
        apparel_by:                    (r.apparel.by || ""),

        emerg_contact_name:            (r.emerg_contact.name || ""),
        emerg_contact_relation:        (r.emerg_contact.relation || ""),
        emerg_contact_phone_day:       (r.emerg_contact.address.phone || ""),
        emerg_contact_phone_eve:       (r.emerg_contact.address.phone_eve || ""),
        emerg_contact_phone_mbl:       (r.emerg_contact.address.phone_mbl || ""),
        emerg_contact_email:           (r.emerg_contact.address.email || r.alt_contact.address.email || ""),

        alt_contact_name:              (r.alt_contact.name || ""),
        alt_contact_relation:          (r.alt_contact.relation || ""),
        alt_contact_phone_day:         (r.alt_contact.address.phone || ""),
        alt_contact_phone_eve:         (r.alt_contact.address.phone_eve || ""),
        alt_contact_phone_mbl:         (r.alt_contact.address.phone_mbl || ""),
        alt_contact_email:             (r.alt_contact.address.email || ""),

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
