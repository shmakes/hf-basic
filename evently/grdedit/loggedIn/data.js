function(r) {
  var app = $$(this).app;
  var dbname = app.db.name;

  if (r._rev) {

    var appDateString = "";
    if ((r.app_date_string) && (r.app_date_string.length > 0)) {
      appDateString = "(Imported application date: " + r.app_date_string + ")";
    }

    var birthDateString = "";
    if ((r.birth_date_string) && (r.birth_date_string.length > 0)) {
      birthDateString = "(Imported birth date: " + r.birth_date_string + ")";
    }

    var birthDate = "", bdy = "", bdm = "", bdd = "";
    var ageFromBirthDate = "";
    if ((r.birth_date) && (r.birth_date.length > 0)) {
      birthDate = r.birth_date;
      var birthDateParts = birthDate.split('-');
      if (birthDateParts.length > 2) {
        bdy = birthDateParts[0];
        bdm = birthDateParts[1];
        bdd = birthDateParts[2];
      }
      var birthYear = new Date(birthDate.replace(/-/g, "/")).getFullYear();
      var thisYear = new Date().getFullYear();
      ageFromBirthDate = "(Age based on birth date: " + (thisYear - birthYear) + ")";
    }

    for (fltIdx in r.availableFlights) {
      availFlt = r.availableFlights[fltIdx];
      if (availFlt.flight == r.flight.id) {
        availFlt.selFlt = "selected";
      }
    }

    var vetId = "";
    var vetName = "";
    if (r.veteran.pairings.length > 0) {
      vetId = r.veteran.pairings[0].id;
      vetName = r.veteran.pairings[0].name;
    }

    var vetId2 = "";
    var vetName2 = "";
    if (r.veteran.pairings.length > 1) {
      vetId2 = r.veteran.pairings[1].id;
      vetName2 = r.veteran.pairings[1].name;
    }

    var result = {
        db_name:                   dbname,
        id:                        r._id,
        raw_data_lnk:              "(raw data)",
        rev:                       r._rev,
        type:                      r.type,
        app_date:                  (r.app_date || ""),
        app_date_string:           appDateString,
        preferred_airport:         r.preferred_airport,
        flights:                   r.availableFlights,
        flight_status:             r.flight.status,
        flight_status_note:        r.flight.status_note,
        flight_id:                 r.flight.id,
        flight_confirmed_date:     (r.flight.confirmed_date || ""),
        flight_confirmed_by:       r.flight.confirmed_by,
        flight_seat:               r.flight.seat,
        flight_bus:                r.flight.bus,
        flight_history:            r.flight.history,
        flight_training:           (r.flight.training || ""),
        flight_training_notes:     (r.flight.training_notes || ""),
        flight_training_complete:  (r.flight.training_complete || false),
        flight_paid:               (r.flight.paid || false),
        veteran_id:                vetId,
        veteran_name:              vetName,
        veteran_id2:               vetId2,
        veteran_name2:             vetName2,
        veteran_pref_notes:        r.veteran.pref_notes,
        first_name:                r.name.first,
        middle_name:               r.name.middle,
        last_name:                 r.name.last,
        nick_name:                 r.name.nickname,
        addr_street:               r.address.street,
        addr_city:                 r.address.city,
        addr_county:               r.address.county,
        addr_state:                r.address.state,
        addr_zip:                  r.address.zip,
        addr_phone_day:            r.address.phone_day,
        addr_phone_eve:            r.address.phone_eve,
        addr_phone_mbl:            r.address.phone_mbl,
        addr_email:                r.address.email,
        birth_year:                bdy,
        birth_month:               bdm,
        birth_day:                 bdd,
        birth_date_string:         birthDateString,
        ageFromBirthDate:          ageFromBirthDate,
        gender:                    r.gender,
        shirt_size:                r.shirt.size,
        notes_other:               r.notes.other,
        notes_previous_hf:         r.notes.previous_hf,
        notes_service:             r.notes.service,
        medical_limitations:       r.medical.limitations,
        medical_experience:        r.medical.experience,
        medical_release:           r.medical.release,
        created_at:                r.metadata.created_at,
        updated_at:                r.metadata.updated_at,
        created_by:                r.metadata.created_by,
        updated_by:                r.metadata.updated_by
    }

    // Set default selections so form reset returns control
    // to propper value.
    var selectedFlight = "selFlt-" + r.flight.id;
    result[selectedFlight] = "selected";
    var selectedBus = "selBus-" + r.flight.bus;
    result[selectedBus] = "selected";
    var selectedSize = "selShrt-" + r.shirt.size;
    result[selectedSize] = "selected";
    var selectedStatus = "selStatus-" + r.flight.status;
    result[selectedStatus] = "selected";
    if (r.flight.training) {
      var selectedTraining = "selTraining-" + r.flight.training;
      result[selectedTraining] = "selected";
    }
    if (r.flight.training_complete) {
      result["selFlightTrainingComplete"] = "checked=yes";
    }
    if (r.flight.paid) {
      result["selFlightPaid"] = "checked=yes";
    }

  } else {

    var result = {
        db_name:                   dbname,
        id:                        "",
        raw_data_lnk:              "",
        rev:                       "",
        type:                      "Guardian",
        app_date:                  ISODateString(new Date()),
        app_date_string:           "",
        preferred_airport:         "",
        flights:                   r.availableFlights,
        flight_status:             "Active",
        flight_status_note:        "",
        flight_id:                 "",
        flight_confirmed_date:     "",
        flight_confirmed_by:       "",
        flight_seat:               "",
        flight_bus:                "",
        flight_history:            [],
        flight_training:           "",
        flight_training_notes:     "",
        flight_training_complete:  "false",
        flight_paid:               "false",
        veteran_id:                "",
        veteran_name:              "",
        veteran_pref_notes:        "",
        first_name:                "",
        middle_name:               "",
        last_name:                 "",
        nick_name:                 "",
        addr_street:               "",
        addr_city:                 "",
        addr_county:               "",
        addr_state:                "",
        addr_zip:                  "",
        addr_phone_day:            "",
        addr_phone_eve:            "",
        addr_phone_mbl:            "",
        addr_email:                "",
        birth_year:                "",
        birth_month:               "",
        birth_day:                 "",
        birth_date_string:         "",
        ageFromBirthDate:          "",
        gender:                    "",
        weight:                    "",
        shirt_size:                "",
        notes_other:               "",
        notes_previous_hf:         "",
        notes_service:             "",
        medical_limitations:       "",
        medical_experience:        "",
        medical_release:           "",
        created_at:                "",
        updated_at:                "",
        created_by:                "",
        updated_by:                ""
    }

  }

  return result;
}

//@ sourceURL=/grdedit/data.js
