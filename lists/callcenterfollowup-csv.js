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
      "Content-disposition": "attachment;filename=CallCenterFollowUp.csv"
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
        call_assigned_to:              (r.call.assigned_to || ""),
        first_name:                    r.name.first,
        middle_name:                   r.name.middle,
        last_name:                     r.name.last,
        nick_name:                     r.name.nickname,
        addr_email:                    r.address.email,
        flight_group:                  (r.flight.group || ""),
        medical_release:               (r.medical.release || ""),
        flight_waiver:                 (r.flight.waiver || ""),
        flight_media_waiver:           (r.flight.mediaWaiver || ""),
        flight_vaccinated:             (r.flight.vaccinated || ""),
        flight_infection_test:         (r.flight.infection_test || ""),
        veteran_mail_sent:             (r.call.mail_sent || false),
        email_sent:                    (r.call.email_sent || false),
        mail_call_received:            ((r.mail_call && r.mail_call.received) || ""),
        flight_training:               training,
        flight_paid:                   paid,
        birth_date:                    r.birth_date,
        gender:                        r.gender,
        shirt_size:                    r.shirt.size,
        call_fm_number:                (r.call.fm_number || ""),
        flight_status:                 r.flight.status,
        flight_status_note:            r.flight.status_note,
        flight_confirmed_date:         r.flight.confirmed_date,
        flight_confirmed_by:           r.flight.confirmed_by,
        flight_training_notes:         r.flight.training_notes,
        flight_nofly:                  (r.flight.nofly || false),
        pair_first_name:               pairFirstName,
        pair_last_name:                pairLastName,
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
