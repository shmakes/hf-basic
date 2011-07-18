function() {
  var flightName = $("#flightName").val();
  var vetId = $(this).parent().parent().attr("vetid");
  if (vetId.length == 32) {
    // Add the veteran name.
    $("#vet_name")[0].textContent = $(this).parent().siblings()[1].textContent;
    var grdId = $(this).parent().parent().attr("grdid");
    $("#vet_id").val(vetId);
    $("#grd_id").val(grdId);

    var app = $$(this).app;

    app.db.openDoc(vetId, {
      success : function(doc) {

        var startZip = parseInt(doc.address.zip.substr(0, 5));
        var endZip = startZip + 1;
        $("#byZip")[0].textContent = startZip;
        var zipSel = $("select#SelectByZip");
        zipSel.find('option').remove().end();
        var zipOpt = zipSel.attr('options');
        app.db.view("basic/guardians_by_zip", {
          descending : false,
          limit: 10,
          startkey : [ flightName, startZip.toString() ],
          endkey : [ flightName, endZip.toString() ],
          success: function(resp) {
            selected = true;
            for (idx in resp.rows) {
              row = resp.rows[idx];
              entry = row.value.name + " | " + row.value.street + " | " + row.value.city;
              zipOpt[zipOpt.length] = new Option(entry, row.id, selected, selected);
              selected = false;
            }
          }
        })

        var state = doc.address.state.toUpperCase();
        var startCounty = doc.address.county.toUpperCase();
        var startCity = doc.address.city.toUpperCase();
        var endCity = startCity.toUpperCase() + "\ufff0";

        $("#byCity")[0].textContent = doc.address.city;
        var citySel = $("select#SelectByCity");
        citySel.find('option').remove().end();
        var cityOpt = citySel.attr('options');
        app.db.view("basic/guardians_by_city", {
          descending : false,
          limit: 10,
          startkey : [ flightName, state, startCounty, startCity ],
          endkey : [ flightName, state, startCounty, endCity ],
          success: function(resp) {
            selected = true;
            for (idx in resp.rows) {
              row = resp.rows[idx];
              entry = row.value.name + " | " + row.value.street + " | " + row.value.zip;
              cityOpt[cityOpt.length] = new Option(entry, row.id, selected, selected);
              selected = false;
            }
          }
        })


        var endCounty = startCounty.toUpperCase() + "\ufff0";
        $("#byCounty")[0].textContent = doc.address.county;
        var countySel = $("select#SelectByCounty");
        countySel.find('option').remove().end();
        var countyOpt = countySel.attr('options');
        app.db.view("basic/guardians_by_county", {
          descending : false,
          limit: 10,
          startkey : [ flightName, state, startCounty ],
          endkey : [ flightName, state, endCounty ],
          success: function(resp) {
            selected = true;
            for (idx in resp.rows) {
              row = resp.rows[idx];
              entry = row.value.name + " | " + row.value.street + " | " + row.value.city;
              countyOpt[countyOpt.length] = new Option(entry, row.id, selected, selected);
              selected = false;
            }
          }
        })


        var app_dateSel = $("select#SelectByAppDate");
        app_dateSel.find('option').remove().end();
        var app_dateOpt = app_dateSel.attr('options');
        app.db.view("basic/guardians_by_app_date", {
          descending : false,
          limit: 10,
          startkey : [ flightName ],
          endkey : [ flightName + "\ufff0" ],
          success: function(resp) {
            selected = true;
            for (idx in resp.rows) {
              row = resp.rows[idx];
              entry = row.value.name + " | " + row.value.street + " | " + row.value.city;
              app_dateOpt[app_dateOpt.length] = new Option(entry, row.id, selected, selected);
              selected = false;
            }
          }
        })


        $("#chooser_trigger").click();
      }
    });
  }
  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#.modalInput~click.js
