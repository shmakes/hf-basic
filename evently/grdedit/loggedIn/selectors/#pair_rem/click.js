function() {
  var veteran_id1 = $("#veteran_id").attr('value');
  var veteran_id2 = $("#veteran_id2").attr('value');
  if ((veteran_id1.length > 0) || (veteran_id2.length > 0)) {
    $("#unpair_trigger").click();
  }

  return false;
};

//@ sourceURL=grdedit/loggedIn/selectors/#pair_rem~click.js
