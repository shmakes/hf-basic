/*
   Copyright 2011 Steve Schmechel

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License
*/

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
        flight_id:             r.flight.id,
        flight_seat:           r.flight.seat,
        flight_group:          r.flight.group,
        flight_history:        r.flight.history,
        guardian_id:           r.veteran.id,
        guardian_name:         r.veteran.name,
        guardian_pref_notes:   r.veteran.pref_notes,
        first_name:            r.name.first,
        middle_name:           r.name.middle,
        last_name:             r.name.last,
        nick_name:             r.name.nickname,
        addr_street:           r.address.street,
        addr_city:             r.address.city,
        addr_county:           r.address.county,
        addr_state:            r.address.state,
        addr_zip:              r.address.zip,
        addr_phone:            r.address.phone,
        addr_email:            r.address.email,
        age:                   r.age,
        ageFromBirthDate:      ageFromBirthDate,
        birth_date:            birthDate,
        birth_date_string:     birthDateString,
        gender:                r.gender,
        weight:                r.weight,
        shirt_size:            r.shirt.size,
        notes_other:           r.notes.other,
        notes_service:         r.notes.service,
        medical_limitations:   r.medical.limitations,
        medical_perscriptions: r.medical.perscriptions,
        medical_review:        r.medical.review,
        medical_general:       r.medical.general,
        created_at:            r.metadata.created_at,
        updated_at:            r.metadata.updated_at,
        created_by:            r.metadata.created_by,
        updated_by:            r.metadata.updated_by
    }

    // Set default selections so form reset returns control
    // to propper value.
    var selectedFlight = "selFlt-" + r.flight.id;
    result[selectedFlight] = "selected";
    var selectedGroup = "selGrp-" + r.flight.group;
    result[selectedGroup] = "selected";
    var selectedSize = "selShrt-" + r.shirt.size;
    result[selectedSize] = "selected";

  } else {

    var result = {
        db_name:               dbname,
        id:                    "",
        raw_data_lnk:          "",
        rev:                   "",
        type:                  "Guardian",
        app_date:              ISODateString(new Date()),
        app_date_string:       "",
        preferred_airport:     "",
        flights:               r.availableFlights,
        flight_id:             "",
        flight_seat:           "",
        flight_group:          "",
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
        addr_phone:            "",
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
        medical_limitations:   "",
        medical_perscriptions: "",
        medical_review:        "",
        medical_general:       "",
        created_at:            "",
        updated_at:            "",
        created_by:            "",
        updated_by:            ""
    }

  }

  return result;
}

//@ sourceURL=/grdedit/data.js
