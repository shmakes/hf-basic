function() {
  var checkBox = this.name;
  var newCheckValue = this.checked;
  var user = $("#user_name").text();
  var app = $$(this).app;
  var docId = "";

  if (checkBox.startsWith("vet")) {
    docId = $(this).parent().parent().attr("vetid");
  } else {
    docId = $(this).parent().parent().attr("grdid");
  }

  changeCheckbox(app, checkBox, docId, newCheckValue, user);
  $("#fltdetail").trigger("update");   
  return false;

};

//@ sourceURL=flight_medical/loggedIn/selectors/:checkbox_change.js
