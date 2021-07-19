function(r) {
  var app = $$(this).app;
  var dbname = app.db.name;

  if (!r.apparel) {
    r.apparel = {};
  }
  if (!r.call) {
    r.call = {};
  }
  if (!r.mail_call) {
    r.mail_call = {};
    r.mail_call.address = {};
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
      ageFromBirthDate = "(Age: " + (thisYear - birthYear) + ")";
    }

    for (fltIdx in r.availableFlights) {
      availFlt = r.availableFlights[fltIdx];
      if (availFlt.flight == r.flight.id) {
        availFlt.selFlt = "selected";
      }
    }

    if (!r.homecoming) {
      r.homecoming = {};
    }

    if (!r.accommodations) {
      r.accommodations = {};
    }

    var result = {
        db_name:                dbname,
        id:                     r._id,
        raw_data_lnk:           "(raw data)",
        rev:                    r._rev,
        type:                   r.type,
        vet_type:               (r.vet_type || "WWII"),
        app_date:               r.app_date,
        app_date_string:        appDateString,
        flights:                r.availableFlights,
        flight_status:          r.flight.status,
        flight_status_note:     r.flight.status_note,
        flight_group:           r.flight.group,
        flight_id:              r.flight.id,
        flight_confirmed_date:  (r.flight.confirmed_date || ""),
        flight_confirmed_by:    r.flight.confirmed_by,
        flight_seat:            r.flight.seat,
        flight_bus:             r.flight.bus,
        flight_waiver:          (r.flight.waiver || false),
        flight_media_waiver:    (r.flight.mediaWaiver || false),
        flight_vaccinated:      (r.flight.vaccinated || false),
        flight_infection_test:  (r.flight.infection_test || false),
        flight_nofly:           (r.flight.nofly || false),
        call_assigned_to:       r.call.assigned_to,
        call_fm_number:         r.call.fm_number,
        call_mail_sent:         (r.call.mail_sent  || false),
        call_email_sent:        (r.call.email_sent || false),
        mc_name:                (r.mail_call.name || ""),
        mc_relation:            (r.mail_call.relation || ""),
        mc_addr_phone:          (r.mail_call.address.phone || ""),
        mc_addr_email:          (r.mail_call.address.email || ""),
        mc_received:            (r.mail_call.received || false),
        mc_adopt:               (r.mail_call.adopt || false),
        mc_notes:               (r.mail_call.notes || ""),
        guardian_id:            r.guardian.id,
        guardian_name:          r.guardian.name,
        guardian_pref_notes:    r.guardian.pref_notes,
        first_name:             r.name.first,
        middle_name:            r.name.middle,
        last_name:              r.name.last,
        nick_name:              r.name.nickname,
        addr_street:            r.address.street,
        addr_city:              r.address.city,
        addr_county:            r.address.county,
        addr_state:             r.address.state,
        addr_zip:               r.address.zip,
        addr_phone_day:         r.address.phone_day,
        addr_phone_eve:         r.address.phone_eve,
        addr_phone_mbl:         r.address.phone_mbl,
        addr_email:             r.address.email,
        birth_year:             bdy,
        birth_month:            bdm,
        birth_day:              bdd,
        birth_date_string:      birthDateString,
        ageFromBirthDate:       ageFromBirthDate,
        gender:                 r.gender,
        weight:                 r.weight,
        shirt_size:             r.shirt.size,
        service_branch:         r.service.branch,
        service_dates:          r.service.dates,
        service_rank:           r.service.rank,
        service_activity:       r.service.activity,
        ec_relation:            r.emerg_contact.relation,
        ec_name:                r.emerg_contact.name,
        ec_addr_street:         r.emerg_contact.address.street,
        ec_addr_city:           r.emerg_contact.address.city,
        ec_addr_state:          r.emerg_contact.address.state,
        ec_addr_zip:            r.emerg_contact.address.zip,
        ec_addr_phone:          r.emerg_contact.address.phone,
        ec_addr_phone_eve:      (r.emerg_contact.address.phone_eve || ""),
        ec_addr_phone_mbl:      (r.emerg_contact.address.phone_mbl || ""),
        ac_relation:            r.alt_contact.relation,
        ac_name:                r.alt_contact.name,
        ac_addr_street:         r.alt_contact.address.street,
        ac_addr_city:           r.alt_contact.address.city,
        ac_addr_state:          r.alt_contact.address.state,
        ac_addr_zip:            r.alt_contact.address.zip,
        ac_addr_phone:          r.alt_contact.address.phone,
        ac_addr_phone_eve:      (r.alt_contact.address.phone_eve || ""),
        ac_addr_phone_mbl:      (r.alt_contact.address.phone_mbl || ""),
        ac_addr_email:          r.alt_contact.address.email,
        medical_limitations:    r.medical.limitations,
        medical_review:         r.medical.review,
        medical_level:          r.medical.level,
        medical_alt_level:      r.medical.alt_level,
        medical_release:        (r.medical.release || false),
        media_newspaper_ok:     (r.media_newspaper_ok || (function(oldMediaVal, oldConfVal){ if(oldMediaVal === true){return "Yes";} else if(oldConfVal) {return "No"} else {return "Unknown"} })(r.media_ok, r.flight.confirmed_by)),
        media_interview_ok:     (r.media_interview_ok || "Unknown"),
        homecoming_destination: (r.homecoming.destination || ""),
        apparel_item:           (r.apparel.item || ""),
        apparel_date:           (r.apparel.date || ""),
        apparel_delivery:       (r.apparel.delivery || ""),
        apparel_notes:          (r.apparel.notes || ""),
        apparel_by:             (r.apparel.by || ""),
        accomm_arrival_date:     (r.accommodations.arrival_date || ""),
        accomm_arrival_time:     (r.accommodations.arrival_time || ""),
        accomm_arrival_flight:   (r.accommodations.arrival_flight || ""),
        accomm_hotel_name:       (r.accommodations.hotel_name || ""),
        accomm_room_type:        (r.accommodations.room_type || ""),
        accomm_attend_banquette: (r.accommodations.attend_banquette || ""),
        accomm_banquette_guest:  (r.accommodations.banquette_guest || ""),
        accomm_departure_date:   (r.accommodations.departure_date || ""),
        accomm_departure_time:   (r.accommodations.departure_time || ""),
        accomm_departure_flight: (r.accommodations.departure_flight || ""),
        accomm_notes:            (r.accommodations.notes || ""),
        created_at:             r.metadata.created_at,
        updated_at:             r.metadata.updated_at,
        created_by:             r.metadata.created_by,
        updated_by:             r.metadata.updated_by
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
    var selectedBranch = "selBranch-" + r.service.branch.split(' ').join('_');
    result[selectedBranch] = "selected";
    var selectedVetType = "selVetType-" + (r.vet_type || "WWII");
    result[selectedVetType] = "selected";
    var selectedGender = "selGender-" + (r.gender || "M");
    result[selectedGender] = "selected";
    var selectedNewspaperOk = "selNewspaper-" + (r.media_newspaper_ok || (function(oldMediaVal, oldConfVal){ 
      if(oldMediaVal === true){return "Yes";} 
      else if(oldConfVal) {return "No"} 
      else {return "Unknown"} })(r.media_ok, r.flight.confirmed_by));
    result[selectedNewspaperOk] = "selected";
    var selectedInterviewOk = "selInterview-" + (r.media_interview_ok || "Unknown");
    result[selectedInterviewOk] = "selected";
    if (r.medical.release) {
      result["selMedicalRelease"] = "checked=yes";
    }
    if (r.flight.waiver) {
      result["selFlightWaiver"] = "checked=yes";
    }
    if (r.flight.mediaWaiver) {
      result["selFlightMediaWaiver"] = "checked=yes";
    }
    if (r.flight.vaccinated) {
      result["selFlightVaccinated"] = "checked=yes";
    }
    if (r.flight.infection_test) {
      result["selFlightInfectionTest"] = "checked=yes";
    }
    if (r.flight.nofly) {
      result["selFlightNoFly"] = "checked=yes";
    }
    if (r.medical.usesCane === 1) {
      result["selMed-cane"] = "checked='yes'";
    }
    if (r.medical.usesWalker === 1) {
      result["selMed-walker"] = "checked='yes'";
    }
    if (r.medical.usesWheelchair === 1) {
      result["selMed-wc"] = "checked='yes'";
    }
    if (r.medical.usesScooter === 1) {
      result["selMed-scooter"] = "checked='yes'";
    }
    if (r.medical.isWheelchairBound === 1) {
      result["selMed-wcb"] = "checked='yes'";
    }
    if (r.medical.requiresOxygen === 1) {
      result["selMed-oxygen"] = "checked='yes'";
    }
    if (r.medical.examRequired === 1) {
      result["selMed-exam"] = "checked='yes'";
    }
    if (r.call.mail_sent) {
      result["selCallMailSent"] = "checked=yes";
    }
    if (r.call.email_sent) {
      result["selCallEmailSent"] = "checked=yes";
    }
    if (r.mail_call.received) {
      result["selMailCallRcvd"] = "checked=yes";
    }
    if (r.mail_call.adopt) {
      result["selMailCallAdopt"] = "checked=yes";
    }
    if (r.apparel.item) {
      result["selApparel-" + r.apparel.item] = "selected";
    }
    if (r.apparel.delivery) {
      result["selDelivery-" + r.apparel.delivery] = "selected";
    }
    if (r.accommodations.room_type) {
      result["selRoomType-" + r.accommodations.room_type] = "selected";
    }
    if (r.accommodations.attend_banquette) {
      result["selBanquette"] = "checked=yes";
    }

  } else {

    var result = {
        db_name:                dbname,
        id:                     "",
        raw_data_lnk:           "",
        rev:                    "",
        type:                   "Veteran",
        vet_type:               "WWII",
        app_date:               ISODateString(new Date()),
        app_date_string:        "",
        app_qualified_date:     "",
        app_qualified_by:       "",
        flights:                r.availableFlights,
        flight_status:          "",
        flight_status_note:     "",
        flight_group:           "",
        flight_id:              "",
        flight_confirmed_date:  "",
        flight_confirmed_by:    "",
        flight_seat:            "",
        flight_bus:             "",
        flight_history:         [],
        flight_waiver:          false,
        flight_media_waiver:    false,
        flight_vaccinated:      false,
        flight_infection_test:  false,
        flight_nofly:           false,
        call_assigned_to:       "",
        call_fm_number:         "",
        call_mail_sent:         false,
        mc_name:                "",
        mc_relation:            "",
        mc_addr_phone:          "",
        mc_addr_email:          "",
        mc_received:            false,
        mc_adopt:               false,
        mc_notes:               "",
        call_email_sent:        false,
        guardian_id:            "",
        guardian_name:          "",
        guardian_pref_notes:    "",
        first_name:             "",
        middle_name:            "",
        last_name:              "",
        nick_name:              "",
        addr_street:            "",
        addr_city:              "",
        addr_county:            "",
        addr_state:             "",
        addr_zip:               "",
        addr_phone_day:         "",
        addr_phone_eve:         "",
        addr_phone_mbl:         "",
        addr_email:             "",
        birth_year:             "",
        birth_month:            "",
        birth_day:              "",
        birth_date_string:      "",
        ageFromBirthDate:       "",
        gender:                 "",
        weight:                 "",
        shirt_size:             "",
        service_branch:         "",
        service_dates:          "",
        service_rank:           "",
        service_number:         "",
        service_activity:       "",
        ec_relation:            "",
        ec_name:                "",
        ec_addr_street:         "",
        ec_addr_city:           "",
        ec_addr_state:          "",
        ec_addr_zip:            "",
        ec_addr_phone:          "",
        ec_addr_phone_eve:      "",
        ec_addr_phone_mbl:      "",
        ac_relation:            "",
        ac_name:                "",
        ac_addr_street:         "",
        ac_addr_city:           "",
        ac_addr_state:          "",
        ac_addr_zip:            "",
        ac_addr_phone:          "",
        ac_addr_email:          "",
        medical_limitations:    "",
        medical_review:         "",
        medical_level:          "",
        medical_alt_level:      "",
        medical_release:        false,
        media_newspaper_ok:     "Unknown",
        media_interview_ok:     "Unknown",
        homecoming_destination: "",
        apparel_item:           "",
        apparel_date:           "",
        apparel_delivery:       "",
        apparel_notes:          "",
        apparel_by:             "",
        accomm_arrival_date:     "",
        accomm_arrival_time:     "",
        accomm_arrival_flight:   "",
        accomm_hotel_name:       "",
        accomm_room_type:        "",
        accomm_attend_banquette: "",
        accomm_banquette_guest:  "",
        accomm_departure_date:   "",
        accomm_departure_time:   "",
        accomm_departure_flight: "",
        accomm_notes:            "",
        created_at:             "",
        updated_at:             "",
        created_by:             "",
        updated_by:             ""
    }

  }

  return result;
}

//@ sourceURL=/vetedit/data.js
