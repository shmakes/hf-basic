function(resp) {
  var flights = resp.rows.map(function(r) {
    return {
      flight : r.key[1]
    };
  });
  flights.unshift({"flight": "All"});
  return {flights:flights};
}

//@ sourceURL=/finder/data.js

