function() {

  $("#form-Flight").validator();

  $(".modalInput").click(function() {
    var rowId = $(this).parent().parent().attr("vetid");
    var info = $(this).parent().siblings();
    var vetName = $("#vet_name");
    vetName[0].textContent = info[1].textContent;

    $("#trigger").click();
  });

  $("#trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },

    closeOnClick: false
  });


  $(this).show();
};

//@ sourceURL=/flight_detail/after.js
