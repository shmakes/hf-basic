$.couch.app(function(app) {  
  $("#vetedit").evently("vetedit", app);
  $.evently.connect($("#account"), $("#vetedit"), ["loggedIn", "loggedOut"]);
});

function update_status_ctrl_states() {
  if($("#flight_status").val() !== "Active") {
    $("#flight_id").attr('disabled', 'disabled');
    $("input[name='flight_group']").attr('disabled', 'disabled');
    $("#showGroups").attr('disabled', 'disabled');
    $("#flight_confirmed_date").attr('disabled', 'disabled');
    $("input[name='flight_confirmed_by']").attr('disabled', 'disabled');
    $("input[name='flight_seat']").attr('disabled', 'disabled');
    $("input[name='preferred_airport']").attr('disabled', 'disabled');
    $("#flight_bus").attr('disabled', 'disabled');
    $("input[name='guardian_pref_notes']").attr('disabled', 'disabled');
  } else {
    $("#flight_id").removeAttr("disabled");
    $("input[name='flight_group']").removeAttr("disabled");
    $("#showGroups").removeAttr("disabled");
    $("#flight_confirmed_date").removeAttr("disabled");
    $("input[name='flight_confirmed_by']").removeAttr("disabled");
    if ($("input[name='flight_nofly']").attr('checked')) {
      $("input[name='flight_seat']").val("NF");
      $("input[name='flight_seat']").attr('disabled', 'disabled');
    } else {
      $("input[name='flight_seat']").removeAttr("disabled");
    }
    $("input[name='preferred_airport']").removeAttr("disabled");
    $("#flight_bus").removeAttr("disabled");
    $("input[name='guardian_pref_notes']").removeAttr("disabled");
  }
} 
