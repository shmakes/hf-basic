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
  var pairList = [];

  if (r._rev) {
    for (idx in r.pairs) {
      entry = {};
      pair = r.pairs[idx].value;
      vet = pair.vet[0];
      entry["vet_id"]       = vet.id;
      entry["vet_name"]     = vet.name;
      entry["vet_city"]     = vet.city;
      entry["vet_appdate"]  = vet.appdate;
      entry["vet_group"]    = vet.group;
      entry["vet_seat"]     = vet.seat;
      entry["vet_pairing"]  = vet.pairing;
      entry["vet_pairName"] = vet.pairName;
      entry["vet_pairPref"] = vet.pairPref;
      var assignedGuardians = 0;
      if (pair.grd) {
        entry["guardians"] = pair.grd.length;
        grd = pair.grd[0];
        entry["grd_id"]       = grd.id;
        entry["grd_name"]     = grd.name;
        entry["grd_city"]     = grd.city;
        entry["grd_appdate"]  = grd.appdate;
        entry["grd_group"]    = grd.group;
        entry["grd_seat"]     = grd.seat;
        entry["grd_pairing"]  = grd.pairing;
        entry["grd_pairName"] = grd.pairName;
        entry["grd_pairPref"] = grd.pairPref;
      }
      pairList.push(entry);
    }

    var result = {
        db_name:               dbname,
        id:                    r._id,
        raw_data_lnk:          "(raw data)",
        rev:                   r._rev,
        type:                  r.type,
        flight_name:           r.name,
        capacity:              r.capacity,
        flight_date:           r.flight_date,
        pairs:                 pairList
    }

  } else {

    var result = {
        db_name:               dbname,
        id:                    "",
        raw_data_lnk:          "",
        rev:                   "",
        type:                  "Flight",
        flight_name:           "",
        capacity:              "",
        flight_date:           ""
    }

  }

  return result;
}

//@ sourceURL=/flight_detail/data.js
