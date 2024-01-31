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
        entry["vet_name_last"]              = vet.name_last;
        entry["vet_medical_form"]           = vet.doc.medical.form;
        entry["vet_flight_vaccinated"]      = vet.doc.flight.vaccinated;
        entry["vet_flight_bus"]             = vet.doc.flight.bus;
        entry["vet_flight_seat"]            = vet.doc.flight.seat;
        entry["vet_medical_requires_oxygen"]= vet.doc.medical.requiresOxygen;
        entry["vet_medical_limitations"]    = "[" + (vet.doc.medical.level || " ") + "/" + (vet.doc.medical.alt_level || " ") + "] " + (vet.doc.medical.limitations || "")
        entry["vet_medical_review"]          = vet.doc.medical.review;

        if (vet.doc.flight.vaccinated) {
          entry["selVetFlightVaccinated"] = "checked=yes";
        }
        if (vet.doc.medical.form) {
          entry["selVetMedicalForm"] = "checked=yes";
        }
        if (vet.doc.medical.requiresOxygen) {
          entry["selVetMedicalRequiresOxygen"] = "checked=yes";
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
        entry["grd_name_last"]              = grd.name_last;
        entry["grd_medical_level"]          = grd.doc.medical.level;
        entry["grd_flight_training_see_doc"]= grd.doc.flight.training_see_doc;
        entry["grd_flight_vaccinated"]      = grd.doc.flight.vaccinated;
        entry["grd_medical_form"]           = grd.doc.medical.form;
        entry["grd_flight_training"]        = grd.doc.flight.training;
        entry["grd_flight_training_comp"]   = grd.doc.flight.training_complete;
        entry["grd_flight_bus"]             = grd.doc.flight.bus;
        entry["grd_flight_seat"]            = grd.doc.flight.seat;

        if (grd.doc.flight.training_see_doc) {
          entry["selGrdFlightTrainingSeeDoc"] = "checked=yes";
        }
        if (grd.doc.flight.vaccinated) {
          entry["selGrdFlightVaccinated"] = "checked=yes";
        }
        if (grd.doc.medical.form) {
          entry["selGrdMedicalForm"] = "checked=yes";
        }
        if (grd.doc.flight.training_complete) {
          entry["selGrdFlightTrainingComp"] = "checked=yes";
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

//@ sourceURL=/flight_medical/data.js
