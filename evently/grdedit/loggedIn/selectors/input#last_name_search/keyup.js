function(event) {
  if (event.keyCode == '13') {
     $("#ByLastNameSearchSubmit").click();
    return false;
   }
  return true;
};

//@ sourceURL=flight_detail/loggedIn/selectors/input#last_name_search~keyup.js
