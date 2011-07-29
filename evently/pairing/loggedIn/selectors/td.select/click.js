function() {
  var row = $(this).parent();
  var docId = row.attr("id");
  var docType = row.attr("class");

  if (docType == "Veteran") {
    window.open("vet_edit.html?vetid=" + docId, '_blank');
  }
  if (docType == "Guardian") {
    window.open("grd_edit.html?grdid=" + docId, '_blank');
  }

};

//@ sourceURL=pairing/loggedIn/selectors/td#person~click.js
