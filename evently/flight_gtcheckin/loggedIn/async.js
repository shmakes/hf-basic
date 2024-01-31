function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.fltid;
  var fromLetterParam = app.req.query.from || "A";
  var thruLetterParam = app.req.query.thru || "Z";
  var fromLetter = fromLetterParam.charAt(0).toUpperCase();
  var thruLetter = thruLetterParam.charAt(0).toUpperCase();
  if (fromLetter < "A" || fromLetter > "Z") {fromLetter = "A";}
  if (thruLetter < "A" || thruLetter > "Z") {thruLetter = "Z";}

  if (docid.length == 32) {
    app.db.openDoc(docid, {
      success : function(doc) {

        app.db.view("basic/flight_pairings", {
          descending : false,
          startkey : [ doc.name ],
          endkey : [ doc.name + "\ufff0" ],
          include_docs: true,
          success: function(resp) {
            doc.pairs = [];
            var lastId = "";
            var pairing = {};
            for (row in resp.rows) {
              var p = resp.rows[row].value;
              p.doc = resp.rows[row].doc;
              var pid = resp.rows[row].key[1];
              var ptype = resp.rows[row].key[2];
              if (pid != lastId) {
                if (pairing.pid) {
                  doc.pairs.push(pairing);
                }
                pairing = {};
                pairing.pid = pid;
                lastId = pid;
              }

              if (p.type == "Guardian") {
                if (pairing.grd) {
                  pairing.grd.push(p);
                } else {
                  pairing.grd = [];
                  pairing.grd.push(p);
                }
              }
              if (p.type == "Veteran") {
                pairing.vet = p;
              }

            }
            if (pairing.pid) {
              doc.pairs.push(pairing);
            }

            var filteredPairs = [];
            var nextHigherThruLetter = String.fromCharCode(thruLetter.toUpperCase().charCodeAt(0) + 1);
            for (idx in doc.pairs) {
              var pairing = doc.pairs[idx];
              if (pairing.grd) {
                var grdLastName = pairing.grd[0].name_last.toUpperCase();
                if (grdLastName > fromLetter.toUpperCase() && grdLastName < nextHigherThruLetter) {
                  filteredPairs.push(pairing);
                }
              }
            }

            doc.pairs = filteredPairs;
            doc.fromLetter = fromLetter;
            doc.thruLetter = thruLetter;
            cb(doc);
          }
        })

      }
    });
  } else if (docid == 'New') {
    doc = {};
    cb(doc);
  }
};

//@ sourceURL=/flight_gtcheckin/async.js
