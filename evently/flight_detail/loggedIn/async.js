function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.fltid;
  //$.log("docid: " + docid)

  if (docid.length == 32) {
    app.db.openDoc(docid, {
      success : function(doc) {

        app.db.view("basic/flight_pairings", {
          descending : true,
          group: true,
          endkey : [ doc.name ],
          startkey : [ doc.name + "Z" ],
          success: function(resp) {
            doc.pairs = [];
            for (row in resp.rows) {
              doc.pairs.push(resp.rows[row]);
            }
          }
        })

        cb(doc);
      }
    });
  } else if (docid == 'New') {
    doc = {};
    cb(doc);
  }
};

//@ sourceURL=/flight_detail/async.js
