function(doc) {
  var flt = {};
  var confirmed = " ";

  if (doc.flight) {
    flt = doc.flight;
    if ((flt.confirmed_date) && (flt.confirmed_date.length > 0)) {
      confirmed = "confirmed";
    }
  }
  if (doc.type == "Veteran") {
    emit([(flt.id || "None"), 
           doc._id, 0],
         { "pair": doc._id,
           "type": doc.type,
           "id": doc._id, 
           "name_first": doc.name.first, 
           "name_last": doc.name.last, 
           "city": doc.address.city + ", " + doc.address.state, 
           "appdate": (doc.app_date || " "),
           "group": (doc.flight.group || " ") + " (" + (doc.vet_type || "WWII") + ")",
           "nofly": (doc.flight.nofly || " "),
           "fm_number": (doc.call ? (doc.call.fm_number || " ") : " "),
           "assigned_to": (doc.call ? (doc.call.assigned_to || " ") : " "),
           "mail_sent": (doc.call ? (doc.call.mail_sent ? "Y" : "N") : "N"),
           "email_sent": (doc.call ? (doc.call.email_sent ? "Y" : "N") : "N"),
           "paired_with": (doc.guardian.id || " "),
           "confirmed": confirmed
         });
  } else if (doc.type == "Guardian") {
    if ((doc.veteran.pairings) && (doc.veteran.pairings.length > 0)) {
      for (vet in doc.veteran.pairings) {
        emit([(flt.id || "None"), 
               doc.veteran.pairings[vet].id, 1],
             { "pair": doc.veteran.pairings[vet].id,
               "type": doc.type,
               "id": doc._id, 
               "name_first": doc.name.first, 
               "name_last": doc.name.last, 
               "city": doc.address.city + ", " + doc.address.state, 
               "appdate": (doc.app_date || " "),
               "group": (doc.flight.group || " "),
               "nofly": (doc.flight.nofly || " "),
               "fm_number": (doc.call ? (doc.call.fm_number || " ") : " "),
               "assigned_to": (doc.call ? (doc.call.assigned_to || " ") : " "),
               "mail_sent": (doc.call ? (doc.call.mail_sent ? "Y" : " ") : " "),
               "email_sent": (doc.call ? (doc.call.email_sent ? "Y" : "N") : "N"),
               "paired_with": (doc.veteran.pairings[vet].id || " "),
               "confirmed": confirmed
             });
      }
    } else {
      emit([(flt.id || "None"), 
             doc._id, 1],
           { "pair": doc._id,
             "type": doc.type,
             "id": doc._id, 
             "name_first": doc.name.first, 
             "name_last": doc.name.last, 
             "city": doc.address.city + ", " + doc.address.state, 
             "appdate": (doc.app_date || " "),
             "group": (doc.flight.group || " "),
             "nofly": (doc.flight.nofly || " "),
             "fm_number": (doc.call ? (doc.call.fm_number || " ") : " "),
             "assigned_to": (doc.call ? (doc.call.assigned_to || " ") : " "),
             "mail_sent": (doc.call ? (doc.call.mail_sent ? "Y" : " ") : " "),
             "email_sent": (doc.call ? (doc.call.email_sent ? "Y" : "N") : "N"),
             "paired_with": " ",
             "confirmed": confirmed
           });
    }
  }
}

