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
      3: { sorter:"checkboxes" }, 
      4: { sorter:"checkboxes" }, 
      7: { sorter:"checkboxes" }, 
      10: { sorter:"checkboxes" }, 
      11: { sorter:"checkboxes" }, 
      14: { sorter:"checkboxes" }, 
      15: { sorter:"checkboxes" }, 
      16: { sorter:"checkboxes" }, 
      17: { sorter:"surname" } 
    },
    textExtraction: function(elem) {
      var $input = $("input", elem);

      return $input.val() || $(elem).text();
    }
  });
};
//@ sourceURL=/flight_medical/after.js
