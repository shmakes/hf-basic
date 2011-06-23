function(context) {
  var app = $$(this).app;
  var url = $("#pasted_url").val();
  if (url.length > 0) {
    idPos = url.indexOf("id=");
    if (idPos > -1) {
      url = url.substr(idPos + 3);
    }
    lastSlash = url.lastIndexOf("/");
    if (lastSlash > -1) {
      url = url.substr(lastSlash + 1);
    }
    ampPos = url.indexOf("&");
    if (ampPos > -1) {
      url = url.substr(0, ampPos);
    }
    guid = url.replace(/^\s+|\s+$/g,"");
    if (guid.length == 32) {
      app.db.openDoc(guid, {
        success: function(doc) {
          if (doc.type) {
            if (doc.type == 'Veteran') {
              window.open("vet_edit.html?vetid=" + doc._id, '_blank')
            } else if (doc.type == 'Guardian') {
              window.open("grd_edit.html?grdid=" + doc._id, '_blank')
            } else if (doc.type == 'Volunteer') {
              window.open("vol_edit.html?volid=" + doc._id, '_blank')
            }
            $("#pasted_url").val("");
          }
        }
      });
    } else {
      alert('Invalid URL');
    }
  }

  return false;
};

//@ sourceURL=/finder/submit_pasted_url.js
