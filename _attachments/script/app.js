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

function PairGuardianToVeteran(app, vetId, grdIdNew, user, grdUpdateFunc) {
  var timestamp = ISODateString(new Date());
  var grdIdOld;
  var vetName;

  app.db.openDoc(vetId, {
    success : function(vetdoc) {
      vetName = vetdoc.name.first + " " + vetdoc.name.last;
      grdIdOld = vetdoc.guardian.id;

      // If an old guardian exists, unpair and log.
      if (grdIdOld.length === 32) {
        app.db.openDoc(grdIdOld, {
          success : function(oldgrd) {
            for (vetIdx in oldgrd.veteran.pairings) {
              if (oldgrd.veteran.pairings[vetIdx].id === vetId) {
                oldgrd.veteran.history.push({
                  id: timestamp,
                  change: "unpaired from: " + vetName + " by: " + user
                });

                oldgrd.veteran.pairings.splice(vetIdx, 1);
                app.db.saveDoc(oldgrd, {
                  success : function() {}
                });
                break;
              }
            }
          }
        });
      }

      // Get the new guardian.
      if (grdIdNew.length === 32) {
        app.db.openDoc(grdIdNew, {
          success : function(newgrd) {
            newgrd.veteran.history.push({
              id: timestamp,
              change: "paired to: " + vetName + " by: " + user
            });
            newgrd.veteran.pairings.push({
              id: vetId,
              name: vetName
            });

            app.db.saveDoc(newgrd, {
              success : function() {}
            });

            // Update veteran history.
            grdName = newgrd.name.first + " " + newgrd.name.last;
            vetdoc.guardian.history.push({
              id: timestamp,
              change: "paired to: " + grdName + " by: " + user
            });
            vetdoc.guardian.id = grdIdNew;
            vetdoc.guardian.name = grdName;

            app.db.saveDoc(vetdoc, {
              success : function() {}
            });
            grdUpdateFunc(vetId, newgrd);
          }
        });
      } else {
            // Update veteran history.
            vetdoc.guardian.history.push({
              id: timestamp,
              change: "unpaired from: " + vetdoc.guardian.name + " by: " + user
            });
            vetdoc.guardian.id = "";
            vetdoc.guardian.name = "";

            app.db.saveDoc(vetdoc, {
              success : function() {
              }
            });
            grdUpdateFunc(vetId, {});
      }
    }
  });
}

