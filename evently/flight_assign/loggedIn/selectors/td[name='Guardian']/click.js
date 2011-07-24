function() {
  var grdId = $(this).parent().attr("id");
  window.open("grd_edit.html?grdid=" + grdId, '_blank');
};

//@ sourceURL=flight_detail/loggedIn/selectors/td#grd_name~click.js
