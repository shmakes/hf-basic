function(context) {
  if (!confirm('The new contact will be created without history with the status "Copied".\nUse this feature with care. Click Cancel to abort.')) {
      return false;
  }
  // Check the form validity.
  var form = $("#form-Grd");
  var isValid = form.data("validator").checkValidity();

  if (isValid) {
    var app = $$(form).app, 
      f = form.serializeObject();

    function saveDoc(doc) {
      var user = $("#user_name").text();
      var timestamp = ISODateString(new Date());

      doc.type = f.type;

      for (var p in f) {
        if (f.hasOwnProperty(p)) {
          f[p] = f[p].trim();
        }
      }

      doc.name = {};
      doc.name.first = f.first_name;
      doc.name.last = f.last_name;
      doc.name.middle = f.middle_name;
      doc.name.nickname = f.nick_name;

      doc.address = {};
      doc.address.street = f.street;
      doc.address.city = f.city;
      doc.address.county = f.county;
      doc.address.state = f.state.toUpperCase();
      doc.address.zip = f.zip;
      doc.address.phone_day = f.phone_day;
      doc.address.phone_eve = f.phone_eve;
      doc.address.phone_mbl = f.phone_mbl;
      doc.address.email = f.email;
      doc.occupation = f.occupation;
      doc.app_date = timestamp.substr(0,10);

      doc.call = {};
      doc.call.history = [];
      doc.call.assigned_to = "";
      doc.call.fm_number = "";
      doc.call.mail_sent = false;
      doc.call.email_sent = false;

      doc.flight = {};
      doc.flight.history = [];
      doc.flight.id = "None";
      doc.flight.confirmed_date = "";
      doc.flight.confirmed_by = "";
      doc.flight.seat = "";
      doc.flight.bus = "None";
      doc.flight.status = "Copied";
      doc.flight.status_note = "";
      doc.flight.training_complete = false;
      doc.flight.paid = false;
      doc.flight.waiver = false;
      doc.flight.mediaWaiver = false;
      doc.flight.booksOrdered = 0;
      doc.flight.nofly = false;
      doc.flight.training = "None";
      doc.flight.training_notes = "";
      doc.flight.history.push({
        id: timestamp,
        change: "copied guardian from doc id: " + f._id + " rev: " + f._rev + " by: " + user
      });
      doc.veteran = {};
      doc.veteran.pref_notes = "";
      doc.veteran.pairings = [];
      doc.veteran.history = [];

      var bdateStr = f.birth_year.replace(/^\s*|\s*$/g, '') + "-" + f.birth_month.replace(/^\s*|\s*$/g, '') + "-" + f.birth_day.replace(/^\s*|\s*$/g, '');
      if (bdateStr.length === 2) {
        doc.birth_date = "";
      } else {
        var birthYear = parseInt(f.birth_year, 10);
        var birthMonth = parseInt(f.birth_month, 10) - 1;
        var birthDay = parseInt(f.birth_day, 10);
        var bdate = new Date(birthYear, birthMonth, birthDay);
        var bdateNewStr = ISODateString(bdate).substr(0,10);
        doc.birth_date = bdateNewStr;
      }

      doc.gender = f.gender.charAt(0).toUpperCase();
      doc.weight = f.weight;
      doc.shirt = {};
      doc.shirt.size = f.shirt_size;
      doc.notes = {};
      doc.notes.other = f.notes_other.replace(/"/g, "'").replace(/\\/g, "/");
      doc.notes.service = f.notes_service.charAt(0).toUpperCase();


      doc.emerg_contact = {};
      doc.emerg_contact.address = {};
      doc.emerg_contact.relation = f.ec_relation;
      doc.emerg_contact.name = f.ec_name;
      doc.emerg_contact.address.phone = f.ec_phone;


      doc.medical = {};
      doc.medical.release = false;
      doc.medical.limitations = "";
      doc.medical.experience = f.medical_experience.replace(/"/g, "'").replace(/\\/g, "/");
      doc.medical.can_push = f.medical_can_push === "true";
      doc.medical.can_lift = f.medical_can_lift === "true";
      doc.medical.level = f.medical_level;

      doc.apparel = {};
      doc.apparel.item = "None";
      doc.apparel.date = "";
      doc.apparel.delivery = "None";
      doc.apparel.by = "";
      doc.apparel.notes = "";


      doc.metadata = {};
      doc.metadata.created_at = timestamp;
      doc.metadata.created_by = user;
      doc.metadata.updated_at = timestamp;
      doc.metadata.updated_by = user;


      app.db.saveDoc(doc, {
        success : function(resp) {
          if (confirm('Copy created successfully.\nPress OK to go to the copy now.\nPress Cancel to stay on this application.')) {
            window.location.href = "./grd_edit.html?grdid=" + resp.id;
          }
        }
      });
    };

      // create a new page
      saveDoc({});
    return false;

  }
  return true;
};

//@ sourceURL=grdedit/loggedIn/selectors/#copyNew~click.js

