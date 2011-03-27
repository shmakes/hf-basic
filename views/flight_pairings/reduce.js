function(keys, values, rereduce) {
  var output = {};
    if (rereduce) {
    for (idx in values) {
      if (values[idx].vet !== undefined) {
        output.vet.push({
          id: values[idx].id,
          name: values[idx].name,
          city: values[idx].city,
          appdate: values[idx].appdate,
          group: values[idx].group,
          seat: values[idx].seat,
          pairing: values[idx].pairing,
          pairName: values[idx].pairName,
          pairPref: values[idx].pairPref
        });
      } else if (values[idx].grd !== undefined) {
        output.grd.push({
          id: values[idx].id,
          name: values[idx].name,
          city: values[idx].city,
          appdate: values[idx].appdate,
          group: values[idx].group,
          seat: values[idx].seat,
          pairing: values[idx].pairing,
          pairName: values[idx].pairName,
          pairPref: values[idx].pairPref
        });
      }
    }
  } else {
    var vets = [], grds = [];
    for (idx in values) {
      if (values[idx].type == "Veteran") {
        vets.push({
          id: values[idx].id,
          name: values[idx].name,
          city: values[idx].city,
          appdate: values[idx].appdate,
          group: values[idx].group,
          seat: values[idx].seat,
          pairing: values[idx].pairing,
          pairName: values[idx].pairName,
          pairPref: values[idx].pairPref
        });
        output.vet = vets;
      }
      else if (values[idx].type == "Guardian") {
        grds.push({
          id: values[idx].id,
          name: values[idx].name,
          city: values[idx].city,
          appdate: values[idx].appdate,
          group: values[idx].group,
          seat: values[idx].seat,
          pairing: values[idx].pairing,
          pairName: values[idx].pairName,
          pairPref: values[idx].pairPref
        });
        output.grd = grds;
      }
    }
  }
  return output;
}
