function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.grdid;
  //$.log("docid: " + docid)

  if (docid.length == 32) {
    app.db.openDoc(docid, {
      success : function(doc) {

        app.db.view("basic/flights", {
          descending : true,
          include_docs: true,
          success: function(resp) {
            doc.availableFlights = [];
            for (row in resp.rows) {
              if (!resp.rows[row].doc.completed || doc.flight.status !== "Active") {
                doc.availableFlights.push({ "flight": resp.rows[row].key[1] });
              }
            }
            cb(doc);
          }
        })
      }
    });
  } else if (docid == 'New') {
    doc = {};

    app.db.view("basic/flights", {
      descending : false,
      include_docs: true,
      success: function(resp) {
        doc.availableFlights = [];
        for (row in resp.rows) {
          if (!resp.rows[row].doc.completed) {
            doc.availableFlights.push({ "flight": resp.rows[row].key[1] });
          }
        }
        cb(doc);
      }
    })
  }
};

//@ sourceURL=/grdedit/async.js
