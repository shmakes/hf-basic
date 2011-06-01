function(cb) {
  var app = $$(this).app;

  app.db.view("basic/pairings", {
    descending : true,
    //group: true,
    //endkey : [ doc.name ],
    //startkey : [ doc.name + "\ufff0" ],
    success: function(resp) {
      doc = {};
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
      doc.pairs = doc.pairs.sort(function(a,b){
        if (a.vet.name_last < b.vet.name_last)
          return -1
        if (a.vet.name_last > b.vet.name_last)
          return 1
        return 0 })
      cb(doc);
    }
  })

};

//@ sourceURL=/pairings/async.js
