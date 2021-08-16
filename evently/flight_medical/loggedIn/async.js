function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.fltid;
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

//@ sourceURL=/flight_medical/async.js
