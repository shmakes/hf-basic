$.couch.app(function(app) {  
  $("#vetedit").evently("vetedit", app);
  $.evently.connect($("#account"), $("#vetedit"), ["loggedIn", "loggedOut"]);
});

function update_status_ctrl_states() {
  if($("#flight_status").val() !== "Active") {
    $("#flight_id").attr('disabled', 'disabled')
  } else {
    $("#flight_id").removeAttr("disabled");
  }
} 
