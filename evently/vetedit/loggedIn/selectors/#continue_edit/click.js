function() {
  update_status_ctrl_states();
  var qs = window.location.search;
  if (qs === "?vetid=New") {
    window.location.search = "?vetid=" + $("input[name='_id']").val();
  }
  return true;
};

//@ sourceURL=vetedit/loggedIn/selectors/#continue_edit~click.js
