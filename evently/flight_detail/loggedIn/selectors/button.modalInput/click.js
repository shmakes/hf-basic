function() {
  var vetId = $(this).parent().parent().attr("vetid");
  $("#vet_name")[0].textContent = $(this).parent().siblings()[1].textContent;
  var app = $$(this).app;

  app.db.openDoc(vetId, {
    success : function(doc) {

      var startZip = parseInt(doc.address.zip.substr(0, 5));
      var endZip = startZip + 1;
      $("#byZip")[0].textContent = startZip;
      var zipSel = $("select[name='ByZipSel']");
      zipSel.find('option').remove().end();
      var zipOpt = zipSel.attr('options');
      app.db.view("basic/guardians_by_zip", {
        descending : false,
        limit: 10,
        startkey : [ startZip.toString() ],
        endkey : [ endZip.toString() ],
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
      var citySel = $("select[name='ByCitySel']");
      citySel.find('option').remove().end();
      var cityOpt = citySel.attr('options');
      app.db.view("basic/guardians_by_city", {
        descending : false,
        limit: 10,
        startkey : [ state, startCounty, startCity ],
        endkey : [ state, startCounty, endCity ],
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


      $("#trigger").click();
    }
  });

  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#.modalInput/click.js
