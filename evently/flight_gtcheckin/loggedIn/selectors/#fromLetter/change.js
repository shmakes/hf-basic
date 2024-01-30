function() {
    var from = $(this).val();
    var to = $("#toLetter").val();
    $('[name="grd_last_name"]').each(function() {
      if ($(this)[0].innerText.startsWith(from)) {
        $(this).parent().remove();
      }
      if ($(this)[0].innerText.startsWith(to)) {
        $(this).parent().remove();
      }
    });
};

//@ sourceURL=fromLetter/change.js
