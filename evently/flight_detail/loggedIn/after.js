function() {

  $("#form-Flight").validator();

  $("#trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },

    closeOnClick: false,
    top: '1'
  });


  $(this).show();
};

//@ sourceURL=/flight_detail/after.js
