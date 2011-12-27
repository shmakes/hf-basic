function(doc) {
  if (doc.address) {
    var ptype = doc.type;
    var pairing = "-";
    var flt = {};
    var num = "";
    if (ptype == "Veteran") {
      pairing = (doc.guardian.name || "None");
    } 
    if (ptype == "Guardian") {
      pairing = "None";
      if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
        pairing = (doc.veteran.pairings[0].name || "None");
      }
    }
    if (doc.flight) {
      flt = doc.flight;
    } 
    if ((doc.address.phone_day) && (doc.address.phone_day.length > 4)) {
      num = doc.address.phone_day.replace(/[^0-9]/g, '');
      if (num.length > 0) {
        emit([num], 
             {"type": ptype,
               "name": doc.name.first + " " + doc.name.last, 
               "city": doc.address.phone_day, 
               "appdate": "Daytime",
               "flight": (flt.id || "-"),
               "status": (flt.status || "-"),
               "pairing": pairing
             });
      }
    }
    if ((doc.address.phone_eve) && (doc.address.phone_eve.length > 4)) {
      num = doc.address.phone_eve.replace(/[^0-9]/g, '');
      if (num.length > 0) {
        emit([doc.address.phone_eve.replace(/[^0-9]/g, '')], 
             {"type": ptype,
               "name": doc.name.first + " " + doc.name.last, 
               "city": doc.address.phone_eve, 
               "appdate": "Evening",
               "flight": (flt.id || "-"),
               "status": (flt.status || "-"),
               "pairing": pairing
             });
      }
    }
    if ((doc.address.phone_mbl) && (doc.address.phone_mbl.length > 4)) {
      num = doc.address.phone_mbl.replace(/[^0-9]/g, '');
      if (num.length > 0) {
        emit([doc.address.phone_mbl.replace(/[^0-9]/g, '')], 
             {"type": ptype,
               "name": doc.name.first + " " + doc.name.last, 
               "city": doc.address.phone_mbl, 
               "appdate": "Mobile",
               "flight": (flt.id || "-"),
               "status": (flt.status || "-"),
               "pairing": pairing
             });
      }
    }
  }
}
