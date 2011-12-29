function() {
  var app = $$(this).app;
  var range = parseInt($("input:radio[name=range]:checked").val(), 10);
  var start = 1 + range;
  var end = 100 + range;

  $("#description").text("List for Guardians " + start + " to " + end);

  // Update the header.
  addGrdHeader();

  // Clear the result area.
  var rslt = $("tbody");
  rslt.html("");

  renderWaitlist(app.db, "basic/waitlist_guardians", start, addGrdRow, rslt);

  return true;
};

//@ sourceURL=waitlist/loggedIn/selectors/#showGrds~click.js
