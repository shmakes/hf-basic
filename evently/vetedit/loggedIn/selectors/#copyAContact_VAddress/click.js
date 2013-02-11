function() {
  $("input[name='ac_street']").val($("input[name='street']").val());
  $("input[name='ac_city']").val($("input[name='city']").val());
  $("input[name='ac_state']").val($("input[name='state']").val());
  $("input[name='ac_zip']").val($("input[name='zip']").val());
  $("input[name='ac_phone']").val($("input[name='phone_day']").val());
  $("input[name='ac_phone_eve']").val($("input[name='phone_eve']").val());
  $("input[name='ac_phone_mbl']").val($("input[name='phone_mbl']").val());
  return false;
};
//@ sourceURL=vetedit/loggedIn/selectors/#copyAContact_VAddress~click.js
