function() {
  var app = $$(this).app;
  var content = "";
  var flt = $("#flight_id").val();
  var output = $("#destinations_content");
  output.html("");
  app.db.view("basic/homecoming_destinations", {
    descending : false,
    group: true,
    group_level: 2,
    include_docs: false,
    start_key: "[\"" + flt + "\",\" \"]",
    end_key: "[\"" + flt + "\",{}]",
    type : "newRows",
    success: function(resp) {
      if (resp.rows.length > 0) {
        for (row in resp.rows) {
          var destination = resp.rows[row].key[1];
            // Add new heading.
          content += "<strong class='destinationHeading'>" + destination + "</strong>";
          content += " (Qty: " + resp.rows[row].value + ")<br/><br/>";
        }
      } else {
        $("#destinations_content").html("<h3>No destinations found.</h3>");
      }
      content += "<br /><hr />";
      output.append(content);
      output.children("strong.destinationHeading").click(function () { 
          $("input[name='homecoming_destination']").val($(this).html()); 
          $("#close_destinations").click();
        });
    }
  });
  $("#destinations_trigger").click();
  return false;
};

//@ sourceURL=vetedit/loggedIn/selectors/#showDestinations~click.js
