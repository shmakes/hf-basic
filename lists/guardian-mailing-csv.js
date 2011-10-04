function(head, req) {
  var row, r;
  start({
    "headers": {
      "Content-Type": "text/csv",
      "Content-disposition": "attachment;filename=GuardianMailing.csv"
     }
  });

  var pairs = [];
  var pair = {};
  var lastId = "";
  while(row = getRow()) {
    r = row.value;
    id = r.pair;
    if (id != lastId) {
      if (pair.pid) {
        pairs.push(pair);
      }
      pair = {};
      pair.pid = id;
      lastId = id;
    }

    if (r.type === "Veteran") {
      pair.vet_first_name      = r.name_first;
      pair.vet_last_name       = r.name_last;
      pair.vet_addr_street     = r.street;
      pair.vet_addr_city       = r.city;
      pair.vet_addr_state      = r.state;
      pair.vet_addr_zip        = r.zip;
      pair.vet_addr_phone_day  = r.phone_day;
      pair.vet_addr_phone_eve  = r.phone_eve;
      pair.vet_addr_phone_mbl  = r.phone_mbl;
    } else {
      pair.grd_first_name      = r.name_first;
      pair.grd_last_name       = r.name_last;
      pair.grd_addr_street     = r.street;
      pair.grd_addr_city       = r.city;
      pair.grd_addr_state      = r.state;
      pair.grd_addr_zip        = r.zip;
      pair.grd_addr_phone_day  = r.phone_day;
      pair.grd_addr_phone_eve  = r.phone_eve;
      pair.grd_addr_phone_mbl  = r.phone_mbl;
    }
  }

  if (pair.pid) {
    pairs.push(pair);
  }

  if (pairs.length > 0) {
    for (var key in pairs[0]) {
      send("\"");
      send(key);
      send("\",");
    }
    send("\n");

    for (var p in pairs) {
      for (var key in pairs[p]) {
        var val = pairs[p][key];
         if ((val) && (val.length > 0)) {
          send("\"");
          send(val);
          send("\"");
        }
        send(",");
      }
      send("\n");
    }
  }
}
