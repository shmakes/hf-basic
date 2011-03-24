// $.couch.app() loads the design document from the server and 
// then calls our application.
$.couch.app(function(app) {  
  
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisp */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisp, t[i], i, t);
    }
  };
}
        
  // setup the account widget
  $("#account").evently("account", app);  

  $("#finder").evently("finder", app);
  $.evently.connect($("#account"), $("#finder"), ["loggedIn", "loggedOut"]);
});


