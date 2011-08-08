function() {
  var qs = window.location.search;
  if (qs === "?volid=New") {
    window.location.search = "?volid=" + $("input[name='_id']").val();
  }
  return true;
};

//@ sourceURL=voledit/loggedIn/selectors/#continue_edit~click.js
