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
              var p = resp.rows[row].value;

              if (p.pair != lastId) {
                if (pairing.pid) {
                  if (pairing.people.length < 2) 
                  {
                    if (pairing.people[0].paired_with.length != 0) {
                      pairing.missing_person = "problem";
                    }
                  }
                  doc.pairs.push(pairing);
                }
                pairing = {};
                pairing.pid = p.pair;
                pairing.missing_person = "";
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
              person.group = p.group;
              person.preference = p.preference;
              person.confirmed = p.confirmed;
              person.paired_with = p.paired_with;
              pairing.people.push(person);

            }

            if (pairing.pid) {
              if (pairing.people.length < 2) 
              {
                if (pairing.people[0].paired_with.length != 0) {
                  pairing.missing_person = "problem";
                }
              }
              doc.pairs.push(pairing);
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
