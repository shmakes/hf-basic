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
        entry["vet_id"]              = vet.id;
        entry["vet_name_first"]      = vet.name_first;
        entry["vet_name_last"]       = vet.name_last;
        entry["vet_flight_waiver"]   = vet.doc.flight.waiver;
        entry["vet_flight_media_waiver"]   = vet.doc.flight.mediaWaiver;
        entry["vet_medical_release"] = vet.doc.medical.release;
        entry["vet_apparel_notes"]   = vet.doc.apparel.notes;

        if (vet.doc.flight.waiver) {
          entry["selVetFlightWaiver"] = "checked=yes";
        }
        if (vet.doc.flight.mediaWaiver) {
          entry["selVetFlightMediaWaiver"] = "checked=yes";
        }
        if (vet.doc.medical.release) {
          entry["selVetMedicalRelease"] = "checked=yes";
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
        entry["grd_id"]            = grd.id;
        entry["grd_name_first"]    = grd.name_first;
        entry["grd_name_last"]     = grd.name_last;
        entry["grd_size"]          = grd.doc.shirt.size;
        entry["grd_apparel_notes"] = grd.doc.apparel.notes;
        entry["grd_flight_waiver"]   = grd.doc.flight.waiver;
        entry["grd_flight_media_waiver"]   = grd.doc.flight.mediaWaiver;
        entry["grd_medical_release"] = grd.doc.medical.release;
        entry["grd_flight_training"] = grd.doc.flight.training;
        entry["grd_flight_training_comp"] = grd.doc.flight.training_complete;
        entry["grd_flight_paid"]     = grd.doc.flight.paid;
        entry["grd_flight_booksOrdered"] = grd.doc.flight.booksOrdered || 0;

        if (grd.doc.flight.waiver) {
          entry["selGrdFlightWaiver"] = "checked=yes";
        }
        if (grd.doc.flight.mediaWaiver) {
          entry["selGrdFlightMediaWaiver"] = "checked=yes";
        }
        if (grd.doc.medical.release) {
          entry["selGrdMedicalRelease"] = "checked=yes";
        }
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
