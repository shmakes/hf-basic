function() {
  $("input[name='ac_street']").val($("input[name='ec_street']").val());
  $("input[name='ac_city']").val($("input[name='ec_city']").val());
  $("input[name='ac_state']").val($("input[name='ec_state']").val());
  $("input[name='ac_zip']").val($("input[name='ec_zip']").val());
  $("input[name='ac_phone']").val($("input[name='ec_phone']").val());
  $("input[name='ac_phone_eve']").val($("input[name='ec_phone_eve']").val());
  $("input[name='ac_phone_mbl']").val($("input[name='ec_phone_mbl']").val());
  $("input[name='ac_email']").val($("input[name='ec_email']").val());
  return false;
};
//@ sourceURL=vetedit/loggedIn/selectors/#copyAContact_EAddress~click.js
