function() {
  street = $("input[name='street']").val();
  city   = $("input[name='city']").val();
  state  = $("input[name='state']").val();
  zip    = $("input[name='zip']").val();
  addr = street + ", " + city + ", " + state + " " + zip;
  if (addr.length > 10) {
    window.open("http://maps.google.com/maps?q='" + addr + "'", '_blank')
  }

  return false;
};

//@ sourceURL=vetedit/loggedIn/selectors/#mapAddress~click.js
