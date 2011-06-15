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

    var shirtSize = "";
    if ((r.shirt) && (r.shirt.size) && (r.shirt.size.length > 0)) {
      shirtSize = r.shirt.size;
    }

    var result = {
        db_name:               dbname,
        id:                    r._id,
        raw_data_lnk:          "(raw data)",
        rev:                   r._rev,
        type:                  r.type,
        app_date:              r.app_date,
        app_date_string:       appDateString,
        flights:               r.availableFlights,
        flight_status:         r.flight.status,
        flight_group:          r.flight.group,
        flight_id:             r.flight.id,
        flight_seat:           r.flight.seat,
        flight_bus:            r.flight.bus,
        flight_history:        r.flight.history,
        first_name:            r.name.first,
        middle_name:           r.name.middle,
        last_name:             r.name.last,
        nick_name:             r.name.nickname,
        addr_street:           r.address.street,
        addr_city:             r.address.city,
        addr_state:            r.address.state,
        addr_zip:              r.address.zip,
        addr_phone_day:        r.address.phone_day,
        addr_phone_eve:        r.address.phone_eve,
        addr_phone_mbl:        r.address.phone_mbl,
        addr_email:            r.address.email,
        birth_date:            birthDate,
        birth_date_string:     birthDateString,
        shirt_size:            shirtSize,
        notes_other:           r.notes.other,
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
    var selectedSize = "selShrt-" + shirtSize;
    result[selectedSize] = "selected";
    var selectedStatus = "selStatus-" + r.flight.status;
    result[selectedStatus] = "selected";

  } else {

    var result = {
        db_name:               dbname,
        id:                    "",
        raw_data_lnk:          "",
        rev:                   "",
        type:                  "Volunteer",
        app_date:              ISODateString(new Date()),
        app_date_string:       "",
        flights:               r.availableFlights,
        flight_id:             "",
        flight_seat:           "",
        flight_group:          "",
        flight_history:        [],
        first_name:            "",
        middle_name:           "",
        last_name:             "",
        nick_name:             "",
        addr_street:           "",
        addr_city:             "",
        addr_state:            "",
        addr_zip:              "",
        addr_phone_day:        "",
        addr_phone_eve:        "",
        addr_phone_mbl:        "",
        addr_email:            "",
        birth_date:            "",
        birth_date_string:     "",
        shirt_size:            "",        
        notes_other:           "",
        created_at:            "",
        updated_at:            "",
        created_by:            "",
        updated_by:            ""
    }

  }

  return result;
}

//@ sourceURL=/voledit/data.js
