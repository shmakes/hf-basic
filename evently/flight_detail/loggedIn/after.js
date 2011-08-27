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

  $("#bus_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },

    closeOnClick: false
  });

  updateCounts();
  $(this).show();
};

//@ sourceURL=/flight_detail/after.js
