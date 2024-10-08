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
      7: { sorter:"checkboxes" }, 
      8: { sorter:"checkboxes" }, 
      9: { sorter:"checkboxes" }, 
      10: { sorter:"checkboxes" }, 
    },
    textExtraction: function(elem) {
      var $input = $("input", elem);

      return $input.val() || $(elem).text();
    }
  });

  var from = $("#from").val();
  $("#fromLetter").val(from);
  var thru = $("#thru").val();
  $("#thruLetter").val(thru);
  MultiselectDropdown(window.MultiselectDropdownOptions);
  //var ttypes = $("#trnTypes").val().split(",");
  //ttypes.forEach((t) => $("select option[value='" + t + "']").attr("selected", "selected"));
};
//@ sourceURL=/flight_gtcheckin/after.js
