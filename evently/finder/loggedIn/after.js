function() {
  $('#status').change(function() {
    $('#last_name').trigger('keyup');
  });
  $('#flight').change(function() {
    $('#last_name').trigger('keyup');
  });
  $(this).show();
  $("#last_name").focus();
};

//@ sourceURL=/finder/loggedIn/after.js
