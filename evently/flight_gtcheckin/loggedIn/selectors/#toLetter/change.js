function() {
    var to = $(this).val();
    var from = $("#fromLetter").val();
    $('[name="grd_last_name"]').each(function() {
      if ($(this)[0].innerText.startsWith(from)) {
        $(this).parent().remove();
      }
      if ($(this)[0].innerText.startsWith(to)) {
        $(this).parent().remove();
      }
    });
};

//@ sourceURL=toLetter/change.js
