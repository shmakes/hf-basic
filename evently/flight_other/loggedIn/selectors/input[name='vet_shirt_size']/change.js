function() {
  var vetId = $(this).parent().parent().attr("vetid");
  var newShirtSize = $(this).val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeShirtSize(app, vetId, newShirtSize, user);
  $("#fltdetail").trigger("update");   
  return true;
};

//@ sourceURL=flight_other/loggedIn/selectors/#vetShirtSizeChange~change.js
