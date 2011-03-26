function(resp) {
  var flights = resp.rows.map(function(r) {
    return {
      flight_uri : encodeURIComponent(r.id),
      flight_name : r.key[1]
    };
  });
  return {flights:flights};
}
