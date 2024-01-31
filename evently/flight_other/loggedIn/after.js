function() {

  $("[name=vet_shirt_size]").validator({ position: 'bottom center' });

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
  $.tablesorter.addParser({
      id: 'checkboxes',
      is: function(s) { return false; },
      format: function(s, table, cell) {
        var checked = $(cell).children(":checkbox").get(0).checked;
        return checked ? 1 : 0;
      },
      type: 'numeric'
  });
  $("#fltdetail").tablesorter({
    headers: { 
      0: { sorter:"surname" }, 
      1: { sorter:"checkboxes" }, 
      2: { sorter:"checkboxes" }, 
      10: { sorter:"checkboxes" }, 
      11: { sorter:"checkboxes" }, 
      13: { sorter:"surname" } 
    },
    textExtraction: function(elem) {
      var $input = $("input", elem);

      return $input.val() || $(elem).text();
    }
  });

  var validShirtSizes = [ "None", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL" ];
  $.tools.validator.fn("[name=vet_shirt_size]", "Enter a valid size",
    function(input, value) {
    return (jQuery.inArray(value, validShirtSizes) >= 0);
  });

  updateDestinationCounts($$(this).app, $("#flightName").val());
};
//@ sourceURL=/flight_other/after.js
