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
  //$("#fltdetail").tablesorter();
  $("#fltdetail").tablesorter({ 
    textExtraction: function(elem) {
      var $input = $("input[type=text]", elem);

      return $input.val() || $(elem).text();
    }
  });
};

//@ sourceURL=/flight_detail/after.js
