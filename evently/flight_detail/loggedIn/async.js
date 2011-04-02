function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.fltid;
  //$.log("docid: " + docid)

  if (docid.length == 32) {
    app.db.openDoc(docid, {
      success : function(doc) {

        app.db.view("basic/flight_pairings", {
          descending : true,
          //group: true,
          endkey : [ doc.name ],
          startkey : [ doc.name + "\ufff0" ],
          success: function(resp) {
            doc.pairs = [];
            var pairing = {};
            for (row in resp.rows) {
              p = resp.rows[row].value;
              if (p.type == "Guardian") {
                if (typeof pairing.grd === 'undefined') {
                  pairing.grd = [];
                }
                pairing.grd.push(p);
              }
              if (p.type == "Veteran") {
                pairing.vet = p;
                doc.pairs.push(pairing);
                pairing = {};
              }
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

//@ sourceURL=/flight_detail/async.js
