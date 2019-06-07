function() {
  var grdId = $(this).parent().parent().attr("grdid");
  var newShirtSize = $(this).val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeShirtSize(app, grdId, newShirtSize, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_other/loggedIn/selectors/#grdShirtSizeChange~change.js
