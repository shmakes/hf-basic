function(e) {
  var row = $(this).parent();
  if (e.srcElement.name == "caller") {
    return;
  }

  var docId = row.attr("id");
  var docType = row.attr("class");
  if (docType == "Veteran") {
    window.open("vet_edit.html?vetid=" + docId, '_blank');
  }
  if (docType == "Guardian") {
    window.open("grd_edit.html?grdid=" + docId, '_blank');
  }

};

//@ sourceURL=flight_detail/loggedIn/selectors/td#person~click.js
