function() {

  $("#form-Flight").validator();

  var triggers = $(".modalInput").overlay({

    // some mask tweaks suitable for modal dialogs
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.9
    },

    closeOnClick: false
  });

  $("#prompt form").submit(function(e) {

    // close the overlay
    triggers.eq(1).overlay().close();

    // get user input
    var input = $("input", this).val();

    // do something with the answer
    triggers.eq(1).html(input);

    // do not submit the form
    return e.preventDefault();
  });

  $(this).show();
};

//@ sourceURL=/flight_detail/after.js
