function(r) {
  //$.log(resp.app_date)  
  var app = $$(this).app;
  var dbname = app.db.name;
  var pairList = [];

  if (r._rev) {

    var result = {
        db_name:               dbname,
        id:                    r._id,
        raw_data_lnk:          "(raw data)",
        rev:                   r._rev,
        type:                  r.type,
        flight_name:           r.name,
        capacity:              r.capacity,
        flight_date:           r.flight_date,
        pairs:                 r.pairs
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

//@ sourceURL=/flight_assign/data.js
