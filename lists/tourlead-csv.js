function(head, req) {
  var row;
  var headerNeeded = true;

  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=TourLead.csv"
     }
  });

  var pairs = [];
  var lastId = "";
  var pairing = {};
  while(row = getRow()) {
    var p = row.doc;
    var pid = row.key[1];
    var ptype = row.key[2];
    if (pid != lastId) {
      if (pairing.pid) {
        pairs.push(pairing);
      }
      pairing = {};
      pairing.pid = pid;
      lastId = pid;
    }

    if (p.type == "Guardian") {
      if (pairing.grd) {
        pairing.grd.push(p);
      } else {
        pairing.grd = [];
        pairing.grd.push(p);
      }
    }
    if (p.type == "Veteran") {
      pairing.vet = p;
    }
  }
  if (pairing.pid) {
    pairs.push(pairing);
  }

  for (pr in pairs) {
    var pair = pairs[pr];

    var result = {
        flight_id:                     "",
        medical_level:                 "",
        medical_alt_level:             "",
        medical_notes:                 "",
        medical_requires_oxygen:       0,
        conflict:                      "",
        service_branch:                "",
        flight_group:                  "",
        flight_bus:                    "",
        first_name:                    "",
        middle_name:                   "",
        last_name:                     "",
        birth_date:                    "",
        gender:                        "",
        shirt_size:                    "",
        vet_seat:                      "",
        grd_seat:                      "",
        pair_shirt_size:               "",
        pair_first_name:               "",
        pair_last_name:                "",
        flight_nofly:                  false
    };

    if (pair.vet) {
        result.flight_id=                     pair.vet.flight.id;
        result.medical_level=                 (pair.vet.medical.level || "");
        result.medical_alt_level=             (pair.vet.medical.alt_level || "");
        result.medical_notes=                 (pair.vet.medical.review || "");
        result.medical_requires_oxygen=       (pair.vet.medical.requiresOxygen || 0);
        result.conflict=                      (pair.vet.vet_type || "WWII");
        result.service_branch=                ((pair.vet.service && pair.vet.service.branch) || "");
        result.flight_group=                  (pair.vet.flight.group || "");
        result.flight_bus=                    pair.vet.flight.bus.replace("Alpha", "Alpha ").replace("Bravo", "Bravo ");
        result.first_name=                    pair.vet.name.first;
        result.middle_name=                   pair.vet.name.middle;
        result.last_name=                     pair.vet.name.last;
        result.birth_date=                    pair.vet.birth_date;
        result.gender=                        pair.vet.gender;
        result.shirt_size=                    pair.vet.shirt.size;
        result.vet_seat=                      pair.vet.flight.seat;
    }

    if (pair.grd) {
        result.grd_seat=                      pair.grd[0].flight.seat;
        result.pair_shirt_size=               pair.grd[0].shirt.size;
        result.pair_first_name=               pair.grd[0].name.first;
        result.pair_last_name=                pair.grd[0].name.last;
        result.flight_nofly=                  (pair.grd[0].flight.nofly || false);
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
