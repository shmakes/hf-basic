function(r) {
  var app = $$(this).app;
  var dbname = app.db.name;

  if (!r.apparel) {
    r.apparel = {};
  }
  if (!r.emerg_contact) {
    r.emerg_contact = {};
  }
  if (!r.emerg_contact.address) {
    r.emerg_contact.address = {};
  }

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
        flight_books_ordered:      (r.flight.booksOrdered || 0),
        flight_waiver:             (r.flight.waiver || false),
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
        occupation:                r.occupation,
        gender:                    r.gender,
        weight:                    r.weight,
        shirt_size:                r.shirt.size,
        ec_relation:               (r.emerg_contact.relation || ""),
        ec_name:                   (r.emerg_contact.name || ""),
        ec_addr_phone:             (r.emerg_contact.address.phone || ""),
        notes_other:               r.notes.other,
        notes_service:             r.notes.service,
        medical_limitations:       r.medical.limitations,
        medical_experience:        r.medical.experience,
        medical_release:           (r.medical.release || false),
        medical_can_push:          (r.medical.can_push || false),
        medical_can_lift:          (r.medical.can_lift || false),
        apparel_item:              (r.apparel.item || ""),
        apparel_date:              (r.apparel.date || ""),
        apparel_delivery:          (r.apparel.delivery || ""),
        apparel_by:                (r.apparel.by || ""),
        apparel_notes:             (r.apparel.notes || ""),
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
    if (r.medical.release === true || r.medical.release === 'Y' || r.medical.release === 'y' ) {
      result["selMedicalRelease"] = "checked=yes";
    }
    if (r.medical.can_push) {
      result["selMedicalCanPush"] = "checked=yes";
    }
    if (r.medical.can_lift) {
      result["selMedicalCanLift"] = "checked=yes";
    }
    if (r.flight.waiver) {
      result["selFlightWaiver"] = "checked=yes";
    }
    if (r.flight.training_complete) {
      result["selFlightTrainingComplete"] = "checked=yes";
    }
    if (r.flight.paid) {
      result["selFlightPaid"] = "checked=yes";
    }
    if (r.apparel.item) {
      result["selApparel-" + r.apparel.item] = "selected";
    }
    if (r.apparel.delivery) {
      result["selDelivery-" + r.apparel.delivery] = "selected";
    }
    var selectedGender = "selGender-" + (r.gender || "M");
    result[selectedGender] = "selected";
    var selectedNotesService = "selNotesService-" + (r.notes.service || "N");
    result[selectedNotesService] = "selected";

  } else {

    var result = {
        db_name:                   dbname,
        id:                        "",
        raw_data_lnk:              "",
        rev:                       "",
        type:                      "Guardian",
        app_date:                  ISODateString(new Date()),
        app_date_string:           "",
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
        flight_training_complete:  false,
        flight_paid:               false,
        flight_waiver:             false,
        flight_books_ordered:      0,
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
        occupation:                "",
        gender:                    "",
        weight:                    "",
        shirt_size:                "",
        ec_relation:               "",
        ec_name:                   "",
        ec_addr_phone:             "",
        notes_other:               "",
        notes_service:             "",
        medical_limitations:       "",
        medical_experience:        "",
        medical_release:           false,
        medical_can_push:          false,
        medical_can_lift:          false,
        apparel_item:              "",
        apparel_date:              "",
        apparel_delivery:          "",
        apparel_by:                "",
        apparel_notes:             "",
        created_at:                "",
        updated_at:                "",
        created_by:                "",
        updated_by:                ""
    }

  }

  return result;
}

//@ sourceURL=/grdedit/data.js
