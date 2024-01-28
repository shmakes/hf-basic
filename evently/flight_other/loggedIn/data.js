function(r) {
  //$.log(resp.app_date)  
  var app = $$(this).app;
  var dbname = app.db.name;
  var pairList = [];
  var training = "";

  if (r._rev) {
    for (idx in r.pairs) {
      entry = {};
      pair = r.pairs[idx];
      training = "";

      if (pair.vet) {
        vet = pair.vet;
        entry["vet_id"]                     = vet.id;
        entry["vet_name_first"]             = vet.name_first;
        entry["vet_name_last"]              = vet.name_last;
        entry["vet_mailcall_received"]      = vet.doc.mail_call.received;
        entry["vet_mailcall_adopt"]         = vet.doc.mail_call.adopt;
        entry["vet_homecoming_destination"] = vet.doc.homecoming ? (vet.doc.homecoming.destination || "") : "";
        entry["vet_shirt_size"]             = vet.doc.shirt.size;
        entry["vet_apparel_shirt_size"]    = vet.doc.apparel.shirt_size;
        entry["vet_apparel_jacket_size"]    = vet.doc.apparel.jacket_size;
        entry["vet_apparel_notes"]          = vet.doc.apparel.notes;

        if (vet.doc.mail_call.received) {
          entry["selVetMailCallReceived"] = "checked=yes";
        }
        if (vet.doc.mail_call.adopt) {
          entry["selVetMailCallAdopt"] = "checked=yes";
        }
      }

      if (pair.grd) {
        if (pair.grd.length > 1) {
          entry["invalid_row"] = " invalid_row";
        } else {
          entry["invalid_row"] = "";
        }
        grd = pair.grd[0];
        if (grd.training) {
          if (grd.training_complete) {
            training = "* ";
          }
          training += grd.training;
        }
        entry["grd_id"]                     = grd.id;
        entry["grd_name_first"]             = grd.name_first;
        entry["grd_name_last"]              = grd.name_last;
        entry["grd_shirt_size"]             = grd.doc.shirt.size;
        entry["grd_apparel_shirt_size"]    = grd.doc.apparel.shirt_size;
        entry["grd_apparel_jacket_size"]    = grd.doc.apparel.jacket_size;
        entry["grd_apparel_notes"]          = grd.doc.apparel.notes;
        entry["grd_flight_training"]        = grd.doc.flight.training;
        entry["grd_flight_training_comp"]   = grd.doc.flight.training_complete;
        entry["grd_flight_paid"]            = grd.doc.flight.paid;
        entry["grd_flight_booksOrdered"]    = grd.doc.flight.booksOrdered || 0;

        if (grd.doc.flight.training_complete) {
          entry["selGrdFlightTrainingComp"] = "checked=yes";
        }
        if (grd.doc.flight.paid) {
          entry["selGrdFlightPaid"] = "checked=yes";
        }
      }

      pairList.push(entry);
    }

    var result = {
        db_name:               dbname,
        id:                    r._id,
        raw_data_lnk:          "(raw data)",
        rev:                   r._rev,
        type:                  r.type,
        flight_name:           r.name,
        capacity:              r.capacity,
        flight_date:           r.flight_date,
        pairs:                 pairList
    }

  } else {

    var result = {
        db_name:               dbname,
        id:                    "",
        raw_data_lnk:          "",
        rev:                   "",
        type:                  "Flight",
        flight_name:           "",
        capacity:              "",
        flight_date:           ""
    }

  }

  return result;
}

//@ sourceURL=/flight_other/data.js
