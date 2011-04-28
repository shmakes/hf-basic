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


      if (!doc.veteran) {
        doc.veteran = {};
      }
      if (doc.veteran.pref_notes != f.veteran_pref_notes) {
        doc.veteran.pref_notes = f.veteran_pref_notes;
        hasChanged = true;
      }
      if (doc.veteran.id != f.veteran_id) {
        doc.veteran.id = f.veteran_id;
        hasChanged = true;
      }
      if (doc.veteran.name != f.veteran_name) {
        doc.veteran.name = f.veteran_name;
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
      if (doc.notes.previous_hf != f.notes_previous_hf) {
        doc.notes.previous_hf = f.notes_previous_hf;
        hasChanged = true;
      }
      if (doc.notes.service != f.notes_service) {
        doc.notes.service = f.notes_service;
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


      if (!doc.ref_contact) {
        doc.ref_contact = {};
      }
      if (doc.ref_contact.relation != f.rc_relation) {
        doc.ref_contact.relation = f.rc_relation;
        hasChanged = true;
      }
      if (doc.ref_contact.name != f.rc_name) {
        doc.ref_contact.name = f.rc_name;
        hasChanged = true;
      }
      if (!doc.ref_contact.address) {
        doc.ref_contact.address = {};
      }
      if (doc.ref_contact.address.street != f.rc_street) {
        doc.ref_contact.address.street = f.rc_street;
        hasChanged = true;
      }
      if (doc.ref_contact.address.city != f.rc_city) {
        doc.ref_contact.address.city = f.rc_city;
        hasChanged = true;
      }
      if (doc.ref_contact.address.state != f.rc_state.toUpperCase()) {
        doc.ref_contact.address.state = f.rc_state.toUpperCase();
        hasChanged = true;
      }
      if (doc.ref_contact.address.zip != f.rc_zip) {
        doc.ref_contact.address.zip = f.rc_zip;
        hasChanged = true;
      }
      if (doc.ref_contact.address.phone != f.rc_phone) {
        doc.ref_contact.address.phone = f.rc_phone;
        hasChanged = true;
      }
      if (doc.ref_contact.address.email != f.rc_email) {
        doc.ref_contact.address.email = f.rc_email;
        hasChanged = true;
      }


      if (!doc.medical) {
        doc.medical = {};
      }
      if (doc.medical.limitations != f.medical_limitations) {
        doc.medical.limitations = f.medical_limitations;
        hasChanged = true;
      }
      if (doc.medical.experience != f.medical_experience) {
        doc.medical.experience = f.medical_experience;
        hasChanged = true;
      }
      if (doc.medical.release != f.medical_release) {
        doc.medical.release = f.medical_release;
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
      saveDoc({});
    }
    return false;

  }
  return true;
};

//@ sourceURL=/grdedit/submit.js
