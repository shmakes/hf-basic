function() {
  $('#status').change(function() {
    $('#flight').val('All');
    $('#last_name').trigger('keyup');
  });
  $('#flight').change(function() {
    $('#status').val('All');
    $('#last_name').trigger('keyup');
  });
  $(this).show();
  $("#last_name").focus();
};

//@ sourceURL=/finder/loggedIn/after.js
