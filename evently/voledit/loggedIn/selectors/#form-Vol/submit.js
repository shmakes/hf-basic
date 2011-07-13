function(context) {

  // Check the form validity.
  var form = $(this);
  var isValid = form.data("validator").checkValidity();

  if (isValid) {
    var app = $$(form).app, 
      f = form.serializeObject();

    function saveDoc(doc) {
      var user = $("#user_name").text();
      var timestamp = ISODateString(new Date());
      var hasChanged = false;

      doc.type = f.type;

      if (!doc.name) {
        doc.name = {};
      }
      if (doc.name.first != f.first_name) {
        doc.name.first = f.first_name;
        hasChanged = true;
      }
      if (doc.name.last != f.last_name) {
        doc.name.last = f.last_name;
        hasChanged = true;
      }
      if (doc.name.middle != f.middle_name) {
        doc.name.middle = f.middle_name;
        hasChanged = true;
      }
      if (doc.name.nickname != f.nick_name) {
        doc.name.nickname = f.nick_name;
        hasChanged = true;
      }

      if (!doc.address) {
        doc.address = {};
      }
      if (doc.address.street != f.street) {
        doc.address.street = f.street;
        hasChanged = true;
      }
      if (doc.address.city != f.city) {
        doc.address.city = f.city;
        hasChanged = true;
      }
      if (doc.address.state != f.state.toUpperCase()) {
        doc.address.state = f.state.toUpperCase();
        hasChanged = true;
      }
      if (doc.address.zip != f.zip) {
        doc.address.zip = f.zip;
        hasChanged = true;
      }
      if (doc.address.phone_day != f.phone_day) {
        doc.address.phone_day = f.phone_day;
        hasChanged = true;
      }
      if (doc.address.phone_eve != f.phone_eve) {
        doc.address.phone_eve = f.phone_eve;
        hasChanged = true;
      }
      if (doc.address.phone_mbl != f.phone_mbl) {
        doc.address.phone_mbl = f.phone_mbl;
        hasChanged = true;
      }
      if (doc.address.email != f.email) {
        doc.address.email = f.email;
        hasChanged = true;
      }

      if (doc.app_date != f.app_date) {
        doc.app_date = f.app_date;
        hasChanged = true;
      }


      if (doc.birth_date != f.birth_date) {
        doc.birth_date = f.birth_date;
        hasChanged = true;
      }
      if (!doc.shirt) {
        doc.shirt = {};
        doc.shirt.size = "";
      }
      if (doc.shirt.size != f.shirt_size) {
        doc.shirt.size = f.shirt_size;
        hasChanged = true;
      }

      if (!doc.notes) {
        doc.notes = {};
      }
      if (doc.notes.other != f.notes_other) {
        doc.notes.other = f.notes_other;
        hasChanged = true;
      }

      if (!doc.metadata) {
        doc.metadata = {};
        doc.metadata.created_at = timestamp;
        doc.metadata.created_by = user;
      }
      doc.metadata.updated_at = timestamp;
      doc.metadata.updated_by = user;


      if (hasChanged) {
        app.db.saveDoc(doc, {
          success : function() {
            // Pop-up the save confirmation.
            $("#saved_trigger").click();
          }
        });
      } else {
        return false;
      }
    };

    if (f._rev) {
      app.db.openDoc(f._id, {
        success : function(doc) {
          doc._rev = f._rev;
          saveDoc(doc);
        }
      }); 
    } else {
      // create a new page
      saveDoc({});
    }
    return false;

  }
  return true;
};

//@ sourceURL=/voledit/submit.js
