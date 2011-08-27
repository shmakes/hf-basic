function() {
  var vetId = $("#vet_id_bus").val();
  var grdId = $("#grd_id_bus").val();
  var user = $("#user_name").text();
  var app = $$(this).app;
  var busId = $(this).attr("value");

  if (vetId.length === 32) {
    assignToBus(app, vetId, busId, user);
    $('tr[vetid="' + vetId + '"]').children('td[name="vet_bus"]').text(busId);
  }
  if (grdId.length === 32) {
    assignToBus(app, grdId, busId, user);
    var vetBusCell = $('tr[grdid="' + grdId + '"]').children('td[name="grd_bus"]');
    vetBusCell.text(busId);
  }

  updateCounts();
  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/#BusPick~click.js
