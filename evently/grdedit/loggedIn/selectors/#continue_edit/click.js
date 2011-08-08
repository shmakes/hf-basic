function() {
  var qs = window.location.search;
  if (qs === "?grdid=New") {
    window.location.search = "?grdid=" + $("input[name='_id']").val();
  }
  return true;
};

//@ sourceURL=grdedit/loggedIn/selectors/#continue_edit~click.js
