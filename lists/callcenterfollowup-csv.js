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

    if (!r.homecoming) {
      r.homecoming = {};
    }

    if (!r.call) {
      r.call = {};
    }
    
    result = {
        flight_id:                     r.flight.id,
        type:                          r.type,
        app_date:                      r.app_date,
        conflict:                      conflict,
        call_assigned_to:              (r.call.assigned_to || ""),
        flight_confirmed_date:         r.flight.confirmed_date,
        flight_confirmed_by:           r.flight.confirmed_by,
        first_name:                    r.name.first,
        middle_name:                   r.name.middle,
        last_name:                     r.name.last,
        nick_name:                     r.name.nickname,
        flight_waiver:                 (r.flight.waiver || ""),
        medical_form:                  (r.medical.form || ""),
        medical_requires_oxygen:       (r.medical.requiresOxygen || 0),
        medical_level:                 (r.medical.level || ""),
        medical_alt_level:             (r.medical.alt_level || ""),
        medical_food_restriction:      (r.medical.food_restriction || "None"),
        flight_paid:                   paid,
        flight_training:               training,
        mail_call_received:            ((r.mail_call && r.mail_call.received) || ""),
        mail_call_adopt:               ((r.mail_call && r.mail_call.adopt) || ""),
        mail_call_notes:               ((r.mail_call && r.mail_call.notes) || ""),
        pair_first_name:               pairFirstName,
        pair_last_name:                pairLastName,
        flight_bus:                    r.flight.bus.replace("Alpha", "Alpha ").replace("Bravo", "Bravo "),
        homecoming_destination:        (r.homecoming.destination || ""),
        call_center_notes:             (r.call.notes || ""),
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
