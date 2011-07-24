function() {

  $("#form-Flight").validator();

  $("#chooser_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },

    closeOnClick: false,
    top: '1'
  });


  $("#progress_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },

    closeOnClick: false
  });


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
