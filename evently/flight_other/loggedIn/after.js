function() {

  $("#form-Flight").validator();

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
      3: { sorter:"checkboxes" }, 
      7: { sorter:"checkboxes" }, 
      8: { sorter:"checkboxes" }, 
      9: { sorter:"checkboxes" }, 
      10: { sorter:"checkboxes" }, 
      11: { sorter:"checkboxes" }, 
      13: { sorter:"surname" } 
    },
    textExtraction: function(elem) {
      var $input = $("input", elem);

      return $input.val() || $(elem).text();
    }
  });

  updateDestinationCounts($$(this).app, $("#flightName").val());
};
//@ sourceURL=/flight_other/after.js
