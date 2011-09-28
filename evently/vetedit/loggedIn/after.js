function() {

  $("#app_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    min: -300,
    max: 1,
    speed: 100
  });

  $.tools.validator.fn("[name=birth_day]", "A valid date from 1910 - 1960.  YYYY-MM-DD", function(input, value) { 
    var bYear = $("input[name='birth_year']").val();
    var bMonth = $("input[name='birth_month']").val();

    var bdateStr = bYear + "-" + bMonth + "-" + value;
    var birthYear = parseInt(bYear);
    var birthMonth = parseInt(bMonth) - 1;
    var birthDay = parseInt(value);
    var bdate = new Date(birthYear, birthMonth, birthDay);
    var byr = bdate.getFullYear();
    var bdateNewStr = ISODateString(bdate).substr(0,10);
    if ((bdate.getFullYear() === birthYear) 
        && (bdate.getMonth() === birthMonth) 
        && (bdate.getDate() === birthDay)) { // was valid
      if ((byr >= 1910) && (byr <= 1960)) {
        return true;
      }
    }
    return false;
  });

  $("#birth_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    yearRange: [-100,-60],
    speed: 100
  });

  $("#flight_confirmed_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    min: -300,
    max: 1,
    speed: 100
  });

  $("#form-Vet").validator();

  document.title = $("input[name='first_name']").val() + " " + $("input[name='last_name']").val();

  // Handle shirt size selection.
  var storedShirtSize = $("#raw_shirt_size").attr('value').toUpperCase();
  $("#shirt_size").val(storedShirtSize);

  var validShirtSizes = [ "None", "S", "M", "L", "XL", "XXL", "XXXL" ];
  $("#shirt_size").validator({inputEvent: "blur"});
  var shirtSizeErr = "Please make a selection.";
  if ($("#raw_shirt_size").attr('value').length > 0) {
    $("#shirt_size")
    shirtSizeErr += " (stored value: " + $("#raw_shirt_size").attr('value') + ")";
  }
  $.tools.validator.fn("#shirt_size", shirtSizeErr,
    function(input, value) {
    return (jQuery.inArray(value, validShirtSizes) >= 0);
  });

  var grdId = $("#guardian_id");
  if (grdId.attr('value').length == 0) {
    $("#grd_edit_link").hide();
  }

  $("#saved_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },

    closeOnClick: false,
    top: '1'
  });

  $("#groups_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },
    fixed: false,
    closeOnClick: false,
    top: '1'
  });

  $(this).show();
};

//@ sourceURL=/vetedit/after.js
