function(cb) {
  var app = $$(this).app;
  var docid = app.req.query.fltid;
  //$.log("docid: " + docid)

  function byAppDate(a,b) {
    if (a.appDate < b.appDate)
       return -1;
    if (a.appDate > b.appDate)
      return 1;
    return 0;
  }

  if (docid.length == 32) {
    app.db.openDoc(docid, {
      success : function(doc) {

        app.db.view("basic/flight_assignment", {
          descending : false,
          startkey : [ doc.name ],
          endkey : [ doc.name + "\ufff0" ],
          success: function(resp) {
            doc.pairs = [];
            var lastId = "";
            var pairing = {};
            for (row in resp.rows) {
              p = resp.rows[row].value;

              if (p.pair != lastId) {
                if (pairing.pid) {
                  doc.pairs.push(pairing);
                }
                pairing = {};
                pairing.pid = p.pair;
                if (typeof pairing.appDate === 'undefined') {
                  pairing.appDate = p.appdate;
                }
                pairing.people = [];
                lastId = p.pair;
              }

              person = {};
              person.type = p.type;
              person.id = p.id;
              person.name_first = p.name_first;
              person.name_last = p.name_last;
              person.city = p.city;
              person.appdate = p.appdate;
              pairing.people.push(person);

            }
            doc.pairs.sort(byAppDate);
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

//@ sourceURL=/flight_assign/async.js
