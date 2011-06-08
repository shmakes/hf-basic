function(r) {
  //$.log(resp.app_date)  
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

    var birthDate = "";
    var ageFromBirthDate = "";
    if ((r.birth_date) && (r.birth_date.length > 0)) {
      birthDate = r.birth_date;
      var birthYear = new Date(birthDate).getFullYear();
      var thisYear = new Date().getFullYear();
      ageFromBirthDate = "(Age based on birth date: " + (thisYear - birthYear) + ")";
    }

    for (fltIdx in r.availableFlights) {
      availFlt = r.availableFlights[fltIdx];
      if (availFlt.flight == r.flight.id) {
        availFlt.selFlt = "selected";
      }
    }


    var result = {
        db_name:               dbname,
        id:                    r._id,
        raw_data_lnk:          "(raw data)",
        rev:                   r._rev,
        type:                  r.type,
        app_date:              r.app_date,
        app_date_string:       appDateString,
        preferred_airport:     r.preferred_airport,
        flights:               r.availableFlights,
        flight_status:         r.flight.status,
        flight_group:          r.flight.group,
        flight_id:             r.flight.id,
        flight_seat:           r.flight.seat,
        flight_bus:            r.flight.bus,
        flight_history:        r.flight.history,
        guardian_id:           r.guardian.id,
        guardian_name:         r.guardian.name,
        guardian_pref_notes:   r.guardian.pref_notes,
        first_name:            r.name.first,
        middle_name:           r.name.middle,
        last_name:             r.name.last,
        nick_name:             r.name.nickname,
        addr_street:           r.address.street,
        addr_city:             r.address.city,
        addr_county:           r.address.county,
        addr_state:            r.address.state,
        addr_zip:              r.address.zip,
        addr_phone_day:        r.address.phone_day,
        addr_phone_eve:        r.address.phone_eve,
        addr_phone_mbl:        r.address.phone_mbl,
        addr_email:            r.address.email,
        age:                   r.age,
        ageFromBirthDate:      ageFromBirthDate,
        birth_date:            birthDate,
        birth_date_string:     birthDateString,
        gender:                r.gender,
        weight:                r.weight,
        shirt_size:            r.shirt.size,
        notes_other:           r.service.branch,
        notes_service:         r.service.activity,
        ec_relation:           r.emerg_contact.relation,
        ec_name:               r.emerg_contact.name,
        ec_addr_street:        r.emerg_contact.address.street,
        ec_addr_city:          r.emerg_contact.address.city,
        ec_addr_state:         r.emerg_contact.address.state,
        ec_addr_zip:           r.emerg_contact.address.zip,
        ec_addr_phone:         r.emerg_contact.address.phone,
        ec_addr_email:         r.emerg_contact.address.email,
        ac_relation:           r.alt_contact.relation,
        ac_name:               r.alt_contact.name,
        ac_addr_street:        r.alt_contact.address.street,
        ac_addr_city:          r.alt_contact.address.city,
        ac_addr_state:         r.alt_contact.address.state,
        ac_addr_zip:           r.alt_contact.address.zip,
        ac_addr_phone:         r.alt_contact.address.phone,
        ac_addr_email:         r.alt_contact.address.email,
        medical_limitations:   r.medical.limitations,
        medical_perscriptions: r.medical.perscriptions,
        medical_review:        r.medical.review,
        medical_category:      r.medical.category,
        created_at:            r.metadata.created_at,
        updated_at:            r.metadata.updated_at,
        created_by:            r.metadata.created_by,
        updated_by:            r.metadata.updated_by
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

  } else {

    var result = {
        db_name:               dbname,
        id:                    "",
        raw_data_lnk:          "",
        rev:                   "",
        type:                  "Veteran",
        app_date:              ISODateString(new Date()),
        app_date_string:       "",
        preferred_airport:     "",
        flights:               r.availableFlights,
        flight_status:         "",
        flight_group:          "",
        flight_id:             "",
        flight_seat:           "",
        flight_bus:            "",
        flight_history:        [],
        guardian_id:           "",
        guardian_name:         "",
        guardian_pref_notes:   "",
        first_name:            "",
        middle_name:           "",
        last_name:             "",
        nick_name:             "",
        addr_street:           "",
        addr_city:             "",
        addr_county:           "",
        addr_state:            "",
        addr_zip:              "",
        addr_phone_day:        "",
        addr_phone_eve:        "",
        addr_phone_mbl:        "",
        addr_email:            "",
        age:                   "",
        ageFromBirthDate:      "",
        birth_date:            "",
        birth_date_string:     "",
        gender:                "",
        weight:                "",
        shirt_size:            "",
        notes_other:           "",
        notes_service:         "",
        ec_relation:           "",
        ec_name:               "",
        ec_addr_street:        "",
        ec_addr_city:          "",
        ec_addr_state:         "",
        ec_addr_zip:           "",
        ec_addr_phone:         "",
        ec_addr_email:         "",
        ac_relation:           "",
        ac_name:               "",
        ac_addr_street:        "",
        ac_addr_city:          "",
        ac_addr_state:         "",
        ac_addr_zip:           "",
        ac_addr_phone:         "",
        ac_addr_email:         "",
        medical_limitations:   "",
        medical_perscriptions: "",
        medical_review:        "",
        medical_category:      "",
        created_at:            "",
        updated_at:            "",
        created_by:            "",
        updated_by:            ""
    }

  }

  return result;
}

//@ sourceURL=/vetedit/data.js
