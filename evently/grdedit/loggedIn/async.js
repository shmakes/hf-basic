function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.grdid;
  //$.log("docid: " + docid)

  if (docid.length == 32) {
    app.db.openDoc(docid, {
      success : function(doc) {

        app.db.view("basic/flights_future", {
          descending : false,
          success: function(resp) {
            doc.availableFlights = [];
            for (row in resp.rows) {
              doc.availableFlights.push({ "flight": resp.rows[row].key[1] });
            }
            cb(doc);
          }
        })

      }
    });
  } else if (docid == 'New') {
    doc = {};

    app.db.view("basic/flights_future", {
      descending : false,
      success: function(resp) {
        doc.availableFlights = [];
        for (row in resp.rows) {
          doc.availableFlights.push({ "flight": resp.rows[row].key[0] });
        }
        cb(doc);
      }
    })

  }
};

//@ sourceURL=/grdedit/async.js
