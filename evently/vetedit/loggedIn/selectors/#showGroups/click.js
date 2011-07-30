function() {
  var app = $$(this).app;
  var content = "";
  var output = $("#groups_content");
  output.html("");
  app.db.view("basic/waitlist_veteran_groups", {
    descending : false,
    include_docs: false,
    type : "newRows",
    success: function(resp) {
      var lastGroup = "";
      if (resp.rows.length > 0) {
        for (row in resp.rows) {
          var group = resp.rows[row].key;
          if (group != lastGroup) {
            // Add new heading.
            content += "<h3 class='groupHeading'>" + group + "</h3>";
            lastGroup = group;
          }
          content += resp.rows[row].value + ", ";
        }
      } else {
        $("#groups_content").html("<h3>No groups found.</h3>");
      }
      content += "<br /><hr />";
      output.append(content);
      output.children("h3").click(function () { 
          $("input[name='flight_group']").val($(this).html()); 
          $("#close_groups").click();
        });
    }
  });
  $("#groups_trigger").click();
  return false;
};

//@ sourceURL=vetedit/loggedIn/selectors/#showGroups~click.js
