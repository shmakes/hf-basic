function(resp) {
  var vets = resp.rows.map(function(r) {
    return {
      vet_uri : encodeURIComponent(r.value._id),
      fullname : r.value.name.first + ' ' + r.value.name.last
    };
  });
  return {vets:vets};
}
