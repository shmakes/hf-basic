function(cb) {
  var app = $$(this).app;
  var results = {};
  results.grd_prefs = [];
  results.vet_prefs = [];

  // Add the guardian preference matches to the results.
  app.db.view("basic/pair_by_grd_pref", {
    descending : false,
    success: function(resp) {
      var lastMatch = "";
      var pairing = {};
      for (row in resp.rows) {
        m = resp.rows[row].key[0];
        p = resp.rows[row].value;

        if (m != lastMatch) {
          if ((pairing.hasVet) && (pairing.hasGrd)) {
            results.grd_prefs.push(pairing);
          }
          pairing = {};
          pairing.pid = m;
          pairing.hasVet = false;
          pairing.hasGrd = false;
          pairing.people = [];
          lastMatch = m;
        }

        person = {};
        person.type = p.type;
        if (p.type === "Veteran") {
          pairing.hasVet = true;
        } else {
          pairing.hasGrd = true;
        }
        person.id = p.id;
        person.name_first = p.name_first;
        person.name_last = p.name_last;
        person.city = p.city;
        person.preference = p.pref;
        pairing.people.push(person);

      }
      if ((pairing.hasVet) && (pairing.hasGrd)) {
        results.grd_prefs.push(pairing);
      }

      // Add the vet preference matches to the results.
      app.db.view("basic/pair_by_vet_pref", {
        descending : false,
        success: function(resp) {
          var lastMatch = "";
          var pairing = {};
          for (row in resp.rows) {
            m = resp.rows[row].key[0];
            p = resp.rows[row].value;

            if (m != lastMatch) {
              if ((pairing.hasVet) && (pairing.hasGrd)) {
                results.vet_prefs.push(pairing);
              }
              pairing = {};
              pairing.pid = m;
              pairing.hasVet = false;
              pairing.hasGrd = false;
              pairing.people = [];
              lastMatch = m;
            }

            person = {};
            person.type = p.type;
            if (p.type === "Veteran") {
              pairing.hasVet = true;
            } else {
              pairing.hasGrd = true;
            }
            person.id = p.id;
            person.name_first = p.name_first;
            person.name_last = p.name_last;
            person.city = p.city;
            person.preference = p.pref;
            pairing.people.push(person);

          }
          if ((pairing.hasVet) && (pairing.hasGrd)) {
            results.vet_prefs.push(pairing);
          }
          cb(results);
        }
      });
    }
  });
};

//@ sourceURL=/pairing/async.js
