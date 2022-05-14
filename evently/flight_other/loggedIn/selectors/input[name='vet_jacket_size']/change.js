function() {
  var vetId = $(this).parent().parent().attr("vetid");
  var newJacketSize = $(this).val();
  var user = $("#user_name").text();
  var app = $$(this).app;

  changeApparelJacketSize(app, vetId, newJacketSize, user);
  $("#fltdetail").trigger("update");   
  return true;
};

//@ sourceURL=flight_other/loggedIn/selectors/#vetJacketSizeChange~change.js
