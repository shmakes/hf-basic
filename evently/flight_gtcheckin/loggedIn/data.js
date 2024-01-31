function(r) {
  //$.log(resp.app_date)  
  var app = $$(this).app;
  var dbname = app.db.name;
  var pairList = [];

  if (r._rev) {
    for (idx in r.pairs) {
      entry = {};
      pair = r.pairs[idx];

      if (pair.vet) {
        vet = pair.vet;
        entry["vet_id"]                     = vet.id;
        entry["vet_name_first"]             = vet.name_first;
        entry["vet_name_middle"]            = vet.doc.name.middle;
        entry["vet_name_last"]              = vet.name_last;

        entry["vet_mailcall_received"]      = vet.doc.mail_call.received;
        entry["vet_mailcall_adopt"]         = vet.doc.mail_call.adopt;
        entry["vet_mailcall_notes"]         = vet.doc.mail_call.notes;
        entry["vet_flight_bus"]             = vet.doc.flight.bus;

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
        entry["grd_id"]                     = grd.id;
        entry["grd_name_first"]             = grd.name_first;
        entry["grd_name_middle"]            = grd.doc.name.middle;
        entry["grd_name_last"]              = grd.name_last;
        entry["grd_birth_date"]             = grd.doc.birth_date;
        entry["grd_gender"]                 = grd.doc.gender;
        entry["grd_addr_phone_mbl"]         = grd.doc.address.phone_mbl;
        entry["grd_addr_email"]             = grd.doc.address.email;
        entry["grd_flight_training"]        = grd.doc.flight.training;
        entry["grd_flight_training_comp"]   = grd.doc.flight.training_complete;
        entry["grd_flight_paid"]            = grd.doc.flight.paid;
        entry["grd_flight_waiver"]          = grd.doc.flight.waiver;
        entry["grd_medical_level"]          = grd.doc.medical.level;
        entry["grd_flight_training_see_doc"]= grd.doc.flight.training_see_doc;

        if (grd.doc.flight.training_complete) {
          entry["selGrdFlightTrainingComp"] = "checked=yes";
        }
        if (grd.doc.flight.paid) {
          entry["selGrdFlightPaid"] = "checked=yes";
        }
        if (grd.doc.flight.waiver) {
          entry["selGrdFlightWaiver"] = "checked=yes";
        }
        if (grd.doc.flight.training_see_doc) {
          entry["selGrdFlightTrainingSeeDoc"] = "checked=yes";
        }
      }

      pairList.push(entry);
    }

    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(r) {
      return {
        letter: r
      };
    });

    var result = {
        db_name:               dbname,
        id:                    r._id,
        raw_data_lnk:          "(raw data)",
        rev:                   r._rev,
        type:                  r.type,
        flight_name:           r.name,
        capacity:              r.capacity,
        flight_date:           r.flight_date,
        from:                  r.fromLetter,
        to:                    r.toLetter,
        alphabet:              alphabet,
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

//@ sourceURL=/flight_gtcheckin/data.js
