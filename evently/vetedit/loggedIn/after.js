function() {

  $("#app_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    min: -3000,
    max: 1,
    speed: 100
  });

  $.tools.validator.fn("[name=flight_confirmed_date]", "Confirmation date is required.", function(input, value) { 
    var confBy = $("input[name='flight_confirmed_by']").val();
    if (confBy  && !value) {
      return false;
    }
    return true;
  });

  $.tools.validator.fn("[name=flight_confirmed_by]", "Confirmed by is required.", function(input, value) { 
    var confDate = $("input[name='flight_confirmed_date']").val();
    if (confDate  && !value) {
      return false;
    }
    return true;
  });

  $.tools.validator.fn("[name=medical_level]", "Medical level required for confirmation.", function(input, value) { 
    var flightStatus = $("#flight_status").val();
    if (flightStatus == "Active") {
      var confDate = $("input[name='flight_confirmed_date']").val();
      var confBy = $("input[name='flight_confirmed_by']").val();
      if (confDate || confBy) {
        if (!value) {
          return false;
        }
      }
    }
    return true;
  });

  $.tools.validator.fn("[name=mc_addr_phone]", "Primary mail call contact phone number is required for confirmation.", function(input, value) { 
    var flightStatus = $("#flight_status").val();
    if (flightStatus == "Active") {
      var confDate = $("input[name='flight_confirmed_date']").val();
      var confBy = $("input[name='flight_confirmed_by']").val();
      if (confDate || confBy) {
        if (!value) {
          return false;
        }
      }
    }
    return true;
  });

  $.tools.validator.fn("[name=mc_addr_email]", "Primary mail call contact email is required for confirmation.", function(input, value) { 
    var flightStatus = $("#flight_status").val();
    if (flightStatus == "Active") {
      var confDate = $("input[name='flight_confirmed_date']").val();
      var confBy = $("input[name='flight_confirmed_by']").val();
      if (confDate || confBy) {
        if (!value) {
          return false;
        }
      }
    }
    return true;
  });

  $.tools.validator.fn("[name=flight_id]", "Cannot be on a flight unless the status is active or flown.", function(input, value) { 
    var flightStatus = $("#flight_status").val();
    if (flightStatus != "Active" && flightStatus != "Flown") {
      var flightId = $("#flight_id").val();
      if (flightId != "None") {
        return false;
      }
    }
    return true;
  });

  $.tools.validator.fn("[name=birth_day]", "A valid date from 1910 - 2000.  YYYY-MM-DD", function(input, value) { 
    var bYear = $("input[name='birth_year']").val().replace(/^\s*|\s*$/g, '');
    var bMonth = $("input[name='birth_month']").val().replace(/^\s*|\s*$/g, '');
    var bDay = value.replace(/^\s*|\s*$/g, '');

    var bdateStr = bYear + "-" + bMonth + "-" + bDay;
    if (bdateStr.length === 2) return true;  // Empty fields.

    var birthYear = parseInt(bYear, 10);
    var birthMonth = parseInt(bMonth, 10) - 1;
    var birthDay = parseInt(bDay, 10);
    var bdate = new Date(birthYear, birthMonth, birthDay);
    var byr = bdate.getFullYear();
    var bdateNewStr = ISODateString(bdate).substr(0,10);
    if ((bdate.getFullYear() === birthYear) 
        && (bdate.getMonth() === birthMonth) 
        && (bdate.getDate() === birthDay)) { // was valid
      if ((byr >= 1910) && (byr <= 2000)) {  // in range
        return true;
      }
    }
    return false;
  });

  $("#app_qualified_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    min: -300,
    max: 1,
    speed: 100
  });

  $("#flight_confirmed_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    min: -300,
    max: 1,
    speed: 100
  });

  $("#apparel_date").dateinput({
    format: 'yyyy-mm-dd',
    selectors: true,
    min: -300,
    max: 1,
    speed: 100
  });

  $("#form-Vet").validator({ position: 'bottom center' });

  document.title = $("input[name='first_name']").val() + " " + $("input[name='last_name']").val();

  // Handle shirt size selection.
  var storedShirtSize = $("#raw_shirt_size").attr('value').toUpperCase();
  $("#shirt_size").val(storedShirtSize);

  var validShirtSizes = [ "None", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL" ];
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

  $("#flight_history_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },
    fixed: false,
    closeOnClick: false,
    top: '1'
  });

  $("#call_history_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },
    fixed: false,
    closeOnClick: false,
    top: '1'
  });

  $("#pairing_history_trigger").overlay({
    mask: {
      color: '#ebecff',
      loadSpeed: 200,
      opacity: 0.7
    },
    fixed: false,
    closeOnClick: false,
    top: '1'
  });

  update_status_ctrl_states();

  $("input[name=middle_name]").keydown(function(event) {
    if (event.which == 190) {
       event.preventDefault();
     }
  });

  $(this).show();
};

//@ sourceURL=/vetedit/after.js
