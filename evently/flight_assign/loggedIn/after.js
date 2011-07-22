function() {

  numVets = $("tr.Veteran").length;
  $("#vetCount").val(numVets.toString());
  
  numGrds = $("tr.Guardian").length;
  $("#grdCount").val(numGrds.toString());

  capacity = parseInt($("#flightCap").val());
  remaining = capacity - numVets - numGrds;
  $("#remainCount").val(remaining.toString());
  
  $(this).show();
};

//@ sourceURL=/flight_assign/after.js
