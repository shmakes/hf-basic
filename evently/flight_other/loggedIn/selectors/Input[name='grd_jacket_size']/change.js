function() {
  var grdId = $(this).parent().parent().attr("grdid");
  var newJacketSize = $(this).val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeApparelJacketSize(app, grdId, newJacketSize, user);
  $("#fltdetail").trigger("update");   
  return false;
};

//@ sourceURL=flight_other/loggedIn/selectors/#grdJacketSizeChange~change.js
