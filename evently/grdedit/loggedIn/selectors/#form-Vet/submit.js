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
      if (doc.address.county != f.county) {
        doc.address.county = f.county;
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
      if (doc.address.phone != f.phone) {
        doc.address.phone = f.phone;
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
      if (doc.preferred_airport != f.preferred_airport) {
        doc.preferred_airport = f.preferred_airport;
        hasChanged = true;
      }

      if (!doc.flight) {
        doc.flight = {};
        doc.flight.history = [];
        doc.flight.id = "None";
        doc.flight.seat = "";
        doc.flight.group = "None";
      }
      if (f.flight_id != doc.flight.id) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight from: " + doc.flight.id + " to: " + f.flight_id + " by: " + user
        });
        doc.flight.id = f.flight_id;
        hasChanged = true;
      }
      if (f.flight_seat != doc.flight.seat) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed seat from: " + doc.flight.seat + " to: " + f.flight_seat + " by: " + user
        });
        doc.flight.seat = f.flight_seat;
        hasChanged = true;
      }
      if (f.flight_group != doc.flight.group) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed group from: " + doc.flight.group + " to: " + f.flight_group + " by: " + user
        });
        doc.flight.group = f.flight_group;
        hasChanged = true;
      }


      if (!doc.veteran) {
        doc.veteran = {};
      }
      if (doc.veteran.pref_notes != f.guardian_pref_notes) {
        doc.veteran.pref_notes = f.guardian_pref_notes;
        hasChanged = true;
      }
      if (doc.veteran.id != f.guardian_id) {
        doc.veteran.id = f.guardian_id;
        hasChanged = true;
      }
      if (doc.veteran.name != f.guardian_name) {
        doc.veteran.name = f.guardian_name;
        hasChanged = true;
      }

      if (doc.birth_date != f.birth_date) {
        doc.birth_date = f.birth_date;
        hasChanged = true;
      }
      if (doc.age != f.age) {
        doc.age = f.age;
        hasChanged = true;
      }
      if (doc.gender != f.gender.toUpperCase()) {
        doc.gender = f.gender.toUpperCase();
        hasChanged = true;
      }
      if (doc.weight != f.weight) {
        doc.weight = f.weight;
        hasChanged = true;
      }
      if (!doc.shirt) {
        doc.shirt = {};
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
      if (doc.notes.service != f.notes_service) {
        doc.notes.service = f.notes_service;
        hasChanged = true;
      }

      if (!doc.medical) {
        doc.medical = {};
      }
      if (doc.medical.perscriptions != f.medical_perscriptions) {
        doc.medical.perscriptions = f.medical_perscriptions;
        hasChanged = true;
      }
      if (doc.medical.review != f.medical_review) {
        doc.medical.review = f.medical_review;
        hasChanged = true;
      }
      if (doc.medical.general != f.medical_general) {
        doc.medical.general = f.medical_general;
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
            window.location = "grd_edit.html?grdid=" + doc._id;
          }
        });
      } else {
        return false;
        //window.location = "index.html";
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
    /*
      saveDoc({
        _id : f._id,
        "jquery.couch.attachPrevRev" : true
      });
    */
      saveDoc({});
        
    }
    return false;

  }
  return true;
};

//@ sourceURL=/grdedit/submit.js
