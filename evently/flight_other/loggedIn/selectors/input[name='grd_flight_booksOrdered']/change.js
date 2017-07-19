function() {
  var grdId = $(this).parent().parent().attr("grdid");
  var newBookCount = parseInt($(this).val());
  var user = $("#user_name").text();
  var app = $$(this).app;

  if (!isNaN(newBookCount)) {
    changeBookCount(app, grdId, newBookCount, user);
    $("#fltdetail").trigger("update");   
  }
  return false;
};

//@ sourceURL=flight_other/loggedIn/selectors/#grdBooksOrdered~change.js
