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
        entry["vet_id"]          = vet.id;
        entry["vet_name_first"]  = vet.name_first;
        entry["vet_name_last"]   = vet.name_last;
        entry["vet_city"]        = vet.city;
        entry["vet_limitations"] = vet.med_limits;
        entry["vet_bus"]         = vet.bus;
        entry["vet_seat"]        = vet.seat;
        entry["vet_pairing"]     = vet.pairing;
        entry["vet_confirmed"]   = vet.confirmed;
        entry["vet_pairName"]    = vet.pairName;
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
        entry["grd_id"]         = grd.id;
        entry["grd_name_first"] = grd.name_first;
        entry["grd_name_last"]  = grd.name_last;
        entry["grd_city"]       = grd.city;
        entry["grd_experience"] = grd.med_exprnc;
        entry["grd_training"]   = training;
        entry["grd_bus"]        = grd.bus;
        entry["grd_seat"]       = grd.seat;
        entry["grd_pairing"]    = grd.pairing;
        entry["grd_confirmed"]  = grd.confirmed;
        entry["grd_pairName"]   = grd.pairName;
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

//@ sourceURL=/flight_detail/data.js
