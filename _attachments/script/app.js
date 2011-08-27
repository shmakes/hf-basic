// $.couch.app() loads the design document from the server and 
// then calls our application.
$.couch.app(function(app) {  
  
  // setup the account widget
  $("#account").evently("account", app);  

  $("#finder").evently("finder", app);
  $.evently.connect($("#account"), $("#finder"), ["loggedIn", "loggedOut"]);
});

function ISODateString(d){

  function pad(n){
    return n<10 ? '0'+n : n
  }

  return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}

function closeW() {
  window.opener = self;
  window.close();
} 

function strUnique(arr) {
  var o = {}, i, l = arr.length, r = [];
  for(i=0; i<l;i++) o[arr[i]] = null;
  for(i in o) r.push(i);
  return r;
}
