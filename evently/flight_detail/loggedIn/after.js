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
  $.tablesorter.addParser({
      id: 'surname',
      is: function(s) { return false; },
      format: function(s) {
        var names = s.trim().replace(/  +/g, " ").split(" ");
        var sortVal = names.length > 1 ? names[1] : s;
        return sortVal;
      },
      type: 'text'
  });
  $("#fltdetail").tablesorter({
    headers: { 0: { sorter:"surname" }, 12: { sorter:"surname" } },
    textExtraction: function(elem) {
      var $input = $("input[type=text]", elem);

      return $input.val() || $(elem).text();
    }
  });
  $("input[value='NF']").attr('disabled', 'disabled');
  $("input[value='NF']").attr('class', 'nofly');

};
//@ sourceURL=/flight_detail/after.js
