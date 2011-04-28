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
        doc.flight.group = "";
        doc.flight.bus = "None";
        doc.flight.status = "Active";
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
      if (f.flight_bus != doc.flight.bus) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed bus from: " + doc.flight.bus + " to: " + f.flight_bus + " by: " + user
        });
        doc.flight.bus = f.flight_bus;
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
      if (f.flight_status != doc.flight.status) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed status from: " + doc.flight.status + " to: " + f.flight_status + " by: " + user
        });
        doc.flight.status = f.flight_status;
        hasChanged = true;
      }


      if (!doc.guardian) {
        doc.guardian = {};
      }
      if (doc.guardian.pref_notes != f.guardian_pref_notes) {
        doc.guardian.pref_notes = f.guardian_pref_notes;
        hasChanged = true;
      }
      if (doc.guardian.id != f.guardian_id) {
        doc.guardian.id = f.guardian_id;
        hasChanged = true;
      }
      if (doc.guardian.name != f.guardian_name) {
        doc.guardian.name = f.guardian_name;
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

      if (!doc.service) {
        doc.service = {};
      }
      if (doc.service.branch != f.notes_other) {
        doc.service.branch = f.notes_other;
        hasChanged = true;
      }
      if (doc.service.activity != f.notes_service) {
        doc.service.activity = f.notes_service;
        hasChanged = true;
      }


      if (!doc.emerg_contact) {
        doc.emerg_contact = {};
      }
      if (doc.emerg_contact.relation != f.ec_relation) {
        doc.emerg_contact.relation = f.ec_relation;
        hasChanged = true;
      }
      if (doc.emerg_contact.name != f.ec_name) {
        doc.emerg_contact.name = f.ec_name;
        hasChanged = true;
      }
      if (!doc.emerg_contact.address) {
        doc.emerg_contact.address = {};
      }
      if (doc.emerg_contact.address.street != f.ec_street) {
        doc.emerg_contact.address.street = f.ec_street;
        hasChanged = true;
      }
      if (doc.emerg_contact.address.city != f.ec_city) {
        doc.emerg_contact.address.city = f.ec_city;
        hasChanged = true;
      }
      if (doc.emerg_contact.address.state != f.ec_state.toUpperCase()) {
        doc.emerg_contact.address.state = f.ec_state.toUpperCase();
        hasChanged = true;
      }
      if (doc.emerg_contact.address.zip != f.ec_zip) {
        doc.emerg_contact.address.zip = f.ec_zip;
        hasChanged = true;
      }
      if (doc.emerg_contact.address.phone != f.ec_phone) {
        doc.emerg_contact.address.phone = f.ec_phone;
        hasChanged = true;
      }
      if (doc.emerg_contact.address.email != f.ec_email) {
        doc.emerg_contact.address.email = f.ec_email;
        hasChanged = true;
      }


      if (!doc.alt_contact) {
        doc.alt_contact = {};
      }
      if (doc.alt_contact.relation != f.ac_relation) {
        doc.alt_contact.relation = f.ac_relation;
        hasChanged = true;
      }
      if (doc.alt_contact.name != f.ac_name) {
        doc.alt_contact.name = f.ac_name;
        hasChanged = true;
      }
      if (!doc.alt_contact.address) {
        doc.alt_contact.address = {};
      }
      if (doc.alt_contact.address.street != f.ac_street) {
        doc.alt_contact.address.street = f.ac_street;
        hasChanged = true;
      }
      if (doc.alt_contact.address.city != f.ac_city) {
        doc.alt_contact.address.city = f.ac_city;
        hasChanged = true;
      }
      if (doc.alt_contact.address.state != f.ac_state.toUpperCase()) {
        doc.alt_contact.address.state = f.ac_state.toUpperCase();
        hasChanged = true;
      }
      if (doc.alt_contact.address.zip != f.ac_zip) {
        doc.alt_contact.address.zip = f.ac_zip;
        hasChanged = true;
      }
      if (doc.alt_contact.address.phone != f.ac_phone) {
        doc.alt_contact.address.phone = f.ac_phone;
        hasChanged = true;
      }
      if (doc.alt_contact.address.email != f.ac_email) {
        doc.alt_contact.address.email = f.ac_email;
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
            window.location = "vet_edit.html?vetid=" + doc._id;
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

//@ sourceURL=/vetedit/submit.js
