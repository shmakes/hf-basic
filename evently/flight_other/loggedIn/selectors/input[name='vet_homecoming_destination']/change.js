function() {
  var vetId = $(this).parent().parent().attr("vetid");
  if (!vetId) {
    $(this).val("");
    return false;
  }

  var newDestination = $(this).val().trim();
  var user = $("#user_name").text();
  var flight = $("#flightName").val();
  var app = $$(this).app;
  var destinations = [];
  $("span.homecoming_destination").each(function(i) {
    destinations.push($(this).html());
  });

  if (destinations.indexOf(newDestination) >= 0 || newDestination === "") {
    changeDestination(app, vetId, newDestination, user, flight);
    $(this).css("background-color", "");
  } else {
    $(this).css("background-color", "red");
  }
  $(this).val(newDestination);
  return false;
};

//@ sourceURL=flight_other/loggedIn/selectors/#vetHomecomingDestination~change.js
