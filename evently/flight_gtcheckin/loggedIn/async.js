function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.fltid;
  var fromLetter = app.req.query.from || "A";
  var toLetter = app.req.query.to || "Z";
  //$.log("docid: " + docid)

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
            for (idx in doc.pairs) {
              var pairing = doc.pairs[idx];
              if (pairing.grd) {
                var grdLastName = pairing.grd[0].name_last.toUpperCase();
                var nextHigherToLetter = String.fromCharCode(toLetter.toUpperCase().charCodeAt(0) + 1);
                if (grdLastName > fromLetter.toUpperCase() && grdLastName < nextHigherToLetter) {
                  filteredPairs.push(pairing);
                }
              }
            }

            doc.pairs = filteredPairs;
            doc.fromLetter = fromLetter;
            doc.toLetter = toLetter;
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
