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
      // TODO: get left 5 digits as int and increment for endKey.
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



      $("#trigger").click();
    }
  });

  return false;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#.modalInput/click.js
