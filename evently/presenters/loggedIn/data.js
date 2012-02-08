function(r) {
  var result = {};
  var presenters = [];
  for (var item in r.items) {
    presenters.push({
            id: item,
          name: r.items[item].name,
      added_by: r.items[item].added_by
    });
  }
  result["presenters"] = presenters;

  return result;
}
