function() {
  var row = $(this).parent().parent();
  var pairings = row.find("tbody")[0].rows;
  if (pairings.length > 2) {
    alert("Too many matches.  You must pair manually.");
    return false;
  }

  var app = $$(this).app;
  var user = $("#user_name").text();
  var vetId = pairings[0].id;
  var grdId = pairings[1].id;

  PairGuardianToVeteran(app, vetId, grdId, user);

  // Remover the row we just paired.
  row.remove();

  // Remove any rows that contain the veteran we just paired.
  $("tr#" + vetId).each(function(){
        $(this).parent().parent().remove();
      });

  // Remove any rows that contain the guardian we just paired.
  $("tr#" + grdId).each(function(){
        $(this).parent().parent().remove();
      });

  return false;
};

//@ sourceURL=pairing/loggedIn/selectors/pair~click.js
