function() {
  var app = $$(this).app;
  var range = parseInt($("input:radio[name=range]:checked").val(), 10);
  var start = 1 + range;
  var end = 200 + range;

  $("#description").text("List for Veterans " + start + " to " + end);

  // Update the header.
  addVetHeader();

  // Clear the result area.
  var rslt = $("tbody");
  rslt.html("");

  renderWaitlist(app.db, "basic/waitlist_veterans", start, addVetRow, rslt);

  return true;
};

//@ sourceURL=waitlist/loggedIn/selectors/#showVets~click.js
