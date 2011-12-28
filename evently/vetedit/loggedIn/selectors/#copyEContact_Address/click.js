function() {
  $("input[name='ec_street']").val($("input[name='street']").val());
  $("input[name='ec_city']").val($("input[name='city']").val());
  $("input[name='ec_state']").val($("input[name='state']").val());
  $("input[name='ec_zip']").val($("input[name='zip']").val());
  $("input[name='ec_phone']").val($("input[name='phone_day']").val());
  $("input[name='ec_phone_eve']").val($("input[name='phone_eve']").val());
  $("input[name='ec_phone_mbl']").val($("input[name='phone_mbl']").val());
  return false;
};
//@ sourceURL=vetedit/loggedIn/selectors/#copyEContact_Address~click.js
