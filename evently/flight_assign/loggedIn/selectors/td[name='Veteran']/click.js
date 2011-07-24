function() {
  var vetId = $(this).parent().attr("id");
  window.open("vet_edit.html?vetid=" + vetId, '_blank');
};

//@ sourceURL=flight_detail/loggedIn/selectors/td#vet_name~click.js
