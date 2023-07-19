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

      for (var p in f) {
        if (f.hasOwnProperty(p)) {
          f[p] = f[p].trim();
        }
      }

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

      if (!doc.call) {
        doc.call = {};
        doc.call.history = [];
        doc.call.assigned_to = "";
        doc.call.fm_number = "";
        doc.call.mail_sent = false;
        doc.call.email_sent = false;
        doc.call.notes = "";
      }

      if ('call_assigned_to' in f && f.call_assigned_to != doc.call.assigned_to) {
        doc.call.history.push({
          id: timestamp,
          change: "changed assigned caller from: " + doc.call.assigned_to + " to: " + f.call_assigned_to + " by: " + user
        });
        doc.call.assigned_to = f.call_assigned_to;
        hasChanged = true;
      }
      if ('call_center_notes' in f) {
        var callNote = f.call_center_notes.replace(/"/g, "'").replace(/\\/g, "/");
        if (callNote != doc.call.notes) {
          doc.call.notes = callNote;
          hasChanged = true;
        }
      }
      if ('call_fm_number' in f && f.call_fm_number != doc.call.fm_number) {
        doc.call.history.push({
          id: timestamp,
          change: "changed FM # from: " + doc.call.fm_number + " to: " + f.call_fm_number + " by: " + user
        });
        doc.call.fm_number = f.call_fm_number;
        hasChanged = true;
      }

      var isCallMailSentForm = (f.call_mail_sent === "true");
      var isCallMailSentDoc = (doc.call.mail_sent === true);
      if (isCallMailSentForm != isCallMailSentDoc) {
        doc.call.history.push({
          id: timestamp,
          change: "changed veteran mail sent from: " + isCallMailSentDoc + " to: " + isCallMailSentForm + " by: " + user
        });
        doc.call.mail_sent = isCallMailSentForm;
        hasChanged = true;
      }

      var isCallEmailSentForm = (f.call_email_sent === "true");
      var isCallEmailSentDoc = (doc.call.email_sent === true);
      if (isCallEmailSentForm != isCallEmailSentDoc) {
        doc.call.history.push({
          id: timestamp,
          change: "changed mail call email sent from: " + isCallEmailSentDoc + " to: " + isCallEmailSentForm + " by: " + user
        });
        doc.call.email_sent = isCallEmailSentForm;
        hasChanged = true;
      }

      if (!doc.mail_call) {
        doc.mail_call = {};
        doc.mail_call.name = "";
        doc.mail_call.relation= "";
        doc.mail_call.address = {};
        doc.mail_call.address.phone = "";
        doc.mail_call.address.email = "";
        doc.mail_call.received = "";
        doc.mail_call.adopt = "";
        doc.mail_call.notes = "";
      }

      var isMailCallReceivedForm = (f.mc_received === "true");
      var isMailCallReceivedDoc = (doc.mail_call.received === true);
      if (isMailCallReceivedForm != isMailCallReceivedDoc) {
        doc.call.history.push({
          id: timestamp,
          change: "changed mail call received from: " + isMailCallReceivedDoc + " to: " + isMailCallReceivedForm + " by: " + user
        });
        doc.mail_call.received = isMailCallReceivedForm;
        hasChanged = true;
      }

      var isMailCallAdoptForm = (f.mc_adopt === "true");
      var isMailCallAdoptDoc = (doc.mail_call.adopt === true);
      if (isMailCallAdoptForm != isMailCallAdoptDoc) {
        doc.call.history.push({
          id: timestamp,
          change: "changed mail call adopt from: " + isMailCallAdoptDoc + " to: " + isMailCallAdoptForm + " by: " + user
        });
        doc.mail_call.adopt = isMailCallAdoptForm;
        hasChanged = true;
      }

      if (doc.mail_call.notes != f.mc_notes) {
        doc.mail_call.notes = f.mc_notes;
        hasChanged = true;
      }

      if (doc.mail_call.relation != f.mc_relation) {
        doc.mail_call.relation = f.mc_relation;
        hasChanged = true;
      }
      if (doc.mail_call.name != f.mc_name) {
        doc.mail_call.name = f.mc_name;
        hasChanged = true;
      }
      if (!doc.mail_call.address) {
        doc.mail_call.address = {};
      }
      if (doc.mail_call.address.phone != f.mc_addr_phone) {
        doc.mail_call.address.phone = f.mc_addr_phone;
        hasChanged = true;
      }
      if (doc.mail_call.address.email != f.mc_addr_email) {
        doc.mail_call.address.email = f.mc_addr_email;
        hasChanged = true;
      }

      if (!doc.flight) {
        doc.flight = {};
        doc.flight.history = [];
        doc.flight.id = "None";
        doc.flight.confirmed_date = "";
        doc.flight.confirmed_by = "";
        doc.flight.seat = "";
        doc.flight.group = "";
        doc.flight.bus = "None";
        doc.flight.status = "Active";
        doc.flight.status_note = "";
        doc.flight.waiver = false;
        doc.flight.mediaWaiver = false;
        doc.flight.vaccinated = false;
        doc.flight.infection_test = false;
        doc.flight.nofly = false;
      }

      if ('flight_id' in f && f.flight_id != doc.flight.id) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight from: " + doc.flight.id + " to: " + f.flight_id + " by: " + user
        });
        doc.flight.id = f.flight_id;
        hasChanged = true;
      }
      if ('flight_confirmed_date' in f && f.flight_confirmed_date != doc.flight.confirmed_date) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed confirmed date from: " + doc.flight.confirmed_date + " to: " + f.flight_confirmed_date + " by: " + user
        });
        doc.flight.confirmed_date = f.flight_confirmed_date;
        hasChanged = true;
      }
      if ('flight_confirmed_by' in f && f.flight_confirmed_by != doc.flight.confirmed_by) {
        doc.flight.confirmed_by = f.flight_confirmed_by;
        hasChanged = true;
      }
      if ('flight_seat' in f && f.flight_seat != doc.flight.seat) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed seat from: " + doc.flight.seat + " to: " + f.flight_seat + " by: " + user
        });
        doc.flight.seat = f.flight_seat;
        hasChanged = true;
      }
      if ('flight_bus' in f && f.flight_bus != doc.flight.bus) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed bus from: " + doc.flight.bus + " to: " + f.flight_bus + " by: " + user
        });
        doc.flight.bus = f.flight_bus;
        hasChanged = true;
      }
      if ('flight_group' in f && f.flight_group != doc.flight.group) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed group from: " + doc.flight.group + " to: " + f.flight_group + " by: " + user
        });
        doc.flight.group = f.flight_group;
        hasChanged = true;
      }
      if ('flight_status' in f && f.flight_status != doc.flight.status) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed status from: " + doc.flight.status + " to: " + f.flight_status + " by: " + user
        });
        doc.flight.status = f.flight_status;
        hasChanged = true;
      }
      if ('flight_status_note' in f) {
        var fltNote = f.flight_status_note.replace(/"/g, "'").replace(/\\/g, "/");
        if (fltNote != doc.flight.status_note) {
          doc.flight.status_note = fltNote;
          hasChanged = true;
        }
      }
      var newspaperOk = f.media_newspaper_ok.replace("--", "Unknown");
      if (doc.media_newspaper_ok != newspaperOk) {
        doc.media_newspaper_ok = newspaperOk;
        hasChanged = true;
      }
      var interviewOk = f.media_interview_ok.replace("--", "Unknown");
      if (doc.media_interview_ok != interviewOk) {
        doc.media_interview_ok = interviewOk;
        hasChanged = true;
      }
      var isFlightWaiverForm = (f.flight_waiver === "true");
      var isFlightWaiverDoc = (doc.flight.waiver === true);
      if (isFlightWaiverForm != isFlightWaiverDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight waiver received from: " + doc.flight.waiver + " to: " + isFlightWaiverForm + " by: " + user
        });
        doc.flight.waiver = isFlightWaiverForm;
        hasChanged = true;
      }
      var isFlightMediaWaiverForm = (f.flight_media_waiver === "true");
      var isFlightMediaWaiverDoc = (doc.flight.mediaWaiver === true);
      if (isFlightMediaWaiverForm != isFlightMediaWaiverDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed media waiver received from: " + doc.flight.mediaWaiver + " to: " + isFlightMediaWaiverForm + " by: " + user
        });
        doc.flight.mediaWaiver = isFlightMediaWaiverForm;
        hasChanged = true;
      }
      var isFlightVaccinatedForm = (f.flight_vaccinated === "true");
      var isFlightVaccinatedDoc = (doc.flight.vaccinated === true);
      if (isFlightVaccinatedForm != isFlightVaccinatedDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed vaccinated from: " + doc.flight.vaccinated + " to: " + isFlightVaccinatedForm + " by: " + user
        });
        doc.flight.vaccinated = isFlightVaccinatedForm;
        hasChanged = true;
      }
      var isFlightInfectionTestForm = (f.flight_infection_test === "true");
      var isFlightInfectionTestDoc = (doc.flight.infection_test === true);
      if (isFlightInfectionTestForm != isFlightInfectionTestDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed infection test from: " + doc.flight.infection_test + " to: " + isFlightInfectionTestForm + " by: " + user
        });
        doc.flight.infection_test = isFlightInfectionTestForm;
        hasChanged = true;
      }
      var isFlightNoFlyForm = (f.flight_nofly === "true");
      var isFlightNoFlyDoc = (doc.flight.nofly === true);
      if (isFlightNoFlyForm != isFlightNoFlyDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed flight nofly from: " + doc.flight.nofly + " to: " + isFlightNoFlyForm + " by: " + user
        });
        doc.flight.nofly = isFlightNoFlyForm;
        if (isFlightNoFlyForm) {
          doc.flight.seat = "NF";
        } 
        hasChanged = true;
      }
      if (!doc.guardian) {
        doc.guardian = {};
        doc.guardian.pref_notes = "";
        doc.guardian.id = "";
        doc.guardian.name = "";
        doc.guardian.history = [];
      }
      if ('guardian_pref_notes' in f && f.guardian_pref_notes != doc.guardian.pref_notes) {
        doc.guardian.pref_notes = f.guardian_pref_notes;
        hasChanged = true;
      }

      var bdateStr = f.birth_year.replace(/^\s*|\s*$/g, '') + "-" + f.birth_month.replace(/^\s*|\s*$/g, '') + "-" + f.birth_day.replace(/^\s*|\s*$/g, '');
      if (bdateStr.length === 2) {
        doc.birth_date = "";
        hasChanged = true;
      } else {
        var birthYear = parseInt(f.birth_year, 10);
        var birthMonth = parseInt(f.birth_month, 10) - 1;
        var birthDay = parseInt(f.birth_day, 10);
        var bdate = new Date(birthYear, birthMonth, birthDay);
        var bdateNewStr = ISODateString(bdate).substr(0,10);
        if ((bdate.getFullYear() === birthYear) 
            && (bdate.getMonth() === birthMonth) 
            && (bdate.getDate() === birthDay)) { // was valid
          if (doc.birth_date != bdateNewStr) {   // was changed
            doc.birth_date = bdateNewStr;
            hasChanged = true;
          }
        }
      }

      if (doc.gender != f.gender.charAt(0).toUpperCase()) {
        doc.gender = f.gender.charAt(0).toUpperCase();
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

      if (doc.vet_type != f.vet_type) {
        doc.vet_type = f.vet_type;
        hasChanged = true;
      }

      if (!doc.service) {
        doc.service = {};
      }
      var branch = f.service_branch; //.split(' ').join('_');
      if (branch === "Unknown") {
        branch = "";
      }
      if (doc.service.branch != branch) {
        doc.service.branch = branch;
        hasChanged = true;
      }
      if (doc.service.dates != f.service_dates) {
        doc.service.dates = f.service_dates;
        hasChanged = true;
      }
      if (doc.service.rank != f.service_rank) {
        doc.service.rank = f.service_rank;
        hasChanged = true;
      }
      if (doc.service.activity != f.service_activity) {
        doc.service.activity = f.service_activity;
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
      if (doc.emerg_contact.address.phone_eve != f.ec_phone_eve) {
        doc.emerg_contact.address.phone_eve = f.ec_phone_eve;
        hasChanged = true;
      }
      if (doc.emerg_contact.address.phone_mbl != f.ec_phone_mbl) {
        doc.emerg_contact.address.phone_mbl = f.ec_phone_mbl;
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
      if (doc.alt_contact.address.phone_eve != f.ac_phone_eve) {
        doc.alt_contact.address.phone_eve = f.ac_phone_eve;
        hasChanged = true;
      }
      if (doc.alt_contact.address.phone_mbl != f.ac_phone_mbl) {
        doc.alt_contact.address.phone_mbl = f.ac_phone_mbl;
        hasChanged = true;
      }
      if (doc.alt_contact.address.email != f.ac_email) {
        doc.alt_contact.address.email = f.ac_email;
        hasChanged = true;
      }
      if (!doc.medical) {
        doc.medical = {};
        doc.medical.release = false;
        doc.medical.form = false;
        doc.medical.usesCane = false;
        doc.medical.usesWalker = false;
        doc.medical.usesWheelchair = false;
        doc.medical.usesScooter = false;
        doc.medical.isWheelchairBound = false;
        doc.medical.requiresOxygen = false;
        doc.medical.examRequired = false;
        doc.medical.limitations = "";
        doc.medical.level = "";
        doc.medical.alt_level = "";
        doc.medical.review = "";
        doc.medical.food_restriction = "None";
      }
      var isMedicalReleaseForm = (f.medical_release === "true");
      var isMedicalReleaseDoc = (doc.medical.release === true);
      if (isMedicalReleaseForm != isMedicalReleaseDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed medical release received from: " + doc.medical.release + " to: " + isMedicalReleaseForm + " by: " + user
        });
        doc.medical.release = isMedicalReleaseForm;
        hasChanged = true;
      }
      var isMedicalFormForm = (f.medical_form === "true");
      var isMedicalFormDoc = (doc.medical.form === true);
      if (isMedicalFormForm != isMedicalFormDoc) {
        doc.flight.history.push({
          id: timestamp,
          change: "changed medical form received from: " + (doc.medical.form || false) + " to: " + isMedicalFormForm + " by: " + user
        });
        doc.medical.form = isMedicalFormForm;
        hasChanged = true;
      }
      var usesCane = 0;
      if (f.medical_uses_cane) {
        usesCane = 1;
      }
      if (doc.medical.usesCane != usesCane) {
        doc.medical.usesCane = usesCane;
        hasChanged = true;
      }
      var usesWalker = 0;
      if (f.medical_uses_walker) {
        usesWalker = 1;
      }
      if (doc.medical.usesWalker != usesWalker) {
        doc.medical.usesWalker = usesWalker;
        hasChanged = true;
      }
      var usesWheelchair = 0;
      if (f.medical_uses_wheelchair) {
        usesWheelchair = 1;
      }
      if (doc.medical.usesWheelchair != usesWheelchair) {
        doc.medical.usesWheelchair = usesWheelchair;
        hasChanged = true;
      }
      var usesScooter = 0;
      if (f.medical_uses_scooter) {
        usesScooter = 1;
      }
      if (doc.medical.usesScooter != usesScooter) {
        doc.medical.usesScooter = usesScooter;
        hasChanged = true;
      }
      var isWheelchairBound = 0;
      if (f.medical_wheelchair_bound) {
        isWheelchairBound = 1;
      }
      if (doc.medical.isWheelchairBound != isWheelchairBound) {
        doc.medical.isWheelchairBound = isWheelchairBound;
        hasChanged = true;
      }
      var requiresOxygen = 0;
      if (f.medical_requires_oxygen) {
        requiresOxygen = 1;
      }
      if (doc.medical.requiresOxygen != requiresOxygen) {
        doc.medical.requiresOxygen = requiresOxygen;
        hasChanged = true;
      }
      var examRequired = 0;
      if (f.medical_exam_required) {
        examRequired = 1;
      }
      if (doc.medical.examRequired != examRequired) {
        doc.medical.examRequired = examRequired;
        hasChanged = true;
      }
      if (doc.medical.limitations != f.medical_limitations) {
        doc.medical.limitations = f.medical_limitations;
        hasChanged = true;
      }
      if (doc.medical.level != f.medical_level) {
        doc.medical.level = f.medical_level;
        hasChanged = true;
      }
      if (doc.medical.alt_level != f.medical_alt_level) {
        doc.medical.alt_level = f.medical_alt_level;
        hasChanged = true;
      }
      var medReview = f.medical_review.replace(/"/g, "'").replace(/\\/g, "/");
      if (doc.medical.review != medReview) {
        doc.medical.review = medReview;
        hasChanged = true;
      }

      if (doc.medical.food_restriction != f.medical_food_restriction) {
        doc.medical.food_restriction = f.medical_food_restriction;
        hasChanged = true;
      }


      if (!doc.homecoming) {
        doc.homecoming = {};
      }
      if (f.flight_id === "None") {
        f.homecoming_destination = "";
      }

      if ('homecoming_destination' in f && f.homecoming_destination != doc.homecoming.destination) {
        doc.homecoming.destination = f.homecoming_destination;
        hasChanged = true;
      }

      if (!doc.apparel) {
        doc.apparel = {};
        doc.apparel.item = "None";
        doc.apparel.jacket_size = "None";
        doc.apparel.shirt_size = "None";
        doc.apparel.date = "";
        doc.apparel.delivery = "None";
        doc.apparel.by = "";
        doc.apparel.notes = "";
      }

      if ('apparel_item' in f && f.apparel_item != doc.apparel.item) {
        doc.apparel.item = f.apparel_item;
        hasChanged = true;
      }
      if ('apparel_jacket_size' in f && f.apparel_jacket_size != doc.apparel.jacket_size) {
        doc.apparel.jacket_size = f.apparel_jacket_size;
        hasChanged = true;
      }
      if ('apparel_shirt_size' in f && f.apparel_shirt_size != doc.apparel.shirt_size) {
        doc.apparel.shirt_size = f.apparel_shirt_size;
        hasChanged = true;
      }
      if ('apparel_date' in f && f.apparel_date != doc.apparel.date) {
        doc.apparel.date = f.apparel_date;
        hasChanged = true;
      }
      if ('apparel_delivery' in f && f.apparel_delivery != doc.apparel.delivery) {
        doc.apparel.delivery = f.apparel_delivery;
        hasChanged = true;
      }
      if ('apparel_by' in f && f.apparel_by != doc.apparel.by) {
        doc.apparel.by = f.apparel_by;
        hasChanged = true;
      }
      if ('apparel_notes' in f && f.apparel_notes != doc.apparel.notes) {
        doc.apparel.notes = f.apparel_notes;
        hasChanged = true;
      }

      if (!doc.accommodations) {
        doc.accommodations = {};
        doc.accommodations.arrival_date = "";
        doc.accommodations.arrival_time = "";
        doc.accommodations.arrival_flight = "";
        doc.accommodations.hotel_name = "";
        doc.accommodations.room_type = "None";
        doc.accommodations.attend_banquette = "";
        doc.accommodations.banquette_guest = "";
        doc.accommodations.departure_date = "";
        doc.accommodations.departure_time = "";
        doc.accommodations.departure_flight = "";
        doc.accommodations.notes = "";
      }

      if ('accomm_arrival_date' in f && f.accomm_arrival_date != doc.accommodations.arrival_date) {
        doc.accommodations.arrival_date = f.accomm_arrival_date;
        hasChanged = true;
      }
      if ('accomm_arrival_time' in f && f.accomm_arrival_time != doc.accommodations.arrival_time) {
        doc.accommodations.arrival_time = f.accomm_arrival_time;
        hasChanged = true;
      }
      if ('accomm_arrival_flight' in f && f.accomm_arrival_flight != doc.accommodations.arrival_flight) {
        doc.accommodations.arrival_flight = f.accomm_arrival_flight;
        hasChanged = true;
      }
      if ('accomm_hotel_name' in f && f.accomm_hotel_name != doc.accommodations.hotel_name) {
        doc.accommodations.hotel_name = f.accomm_hotel_name;
        hasChanged = true;
      }
      if ('accomm_room_type' in f && f.accomm_room_type != doc.accommodations.room_type) {
        doc.accommodations.room_type = f.accomm_room_type;
        hasChanged = true;
      }
      if ('accomm_attend_banquette' in f && f.accomm_attend_banquette != doc.accommodations.attend_banquette) {
        doc.accommodations.attend_banquette = f.accomm_attend_banquette;
        hasChanged = true;
      }
      if ('accomm_banquette_guest' in f && f.accomm_banquette_guest != doc.accommodations.banquette_guest) {
        doc.accommodations.banquette_guest = f.accomm_banquette_guest;
        hasChanged = true;
      }
      if ('accomm_departure_date' in f && f.accomm_departure_date != doc.accommodations.departure_date) {
        doc.accommodations.departure_date = f.accomm_departure_date;
        hasChanged = true;
      }
      if ('accomm_departure_time' in f && f.accomm_departure_time != doc.accommodations.departure_time) {
        doc.accommodations.departure_time = f.accomm_departure_time;
        hasChanged = true;
      }
      if ('accomm_departure_flight' in f && f.accomm_departure_flight != doc.accommodations.departure_flight) {
        doc.accommodations.departure_flight = f.accomm_departure_flight;
        hasChanged = true;
      }
      if ('accomm_notes' in f && f.accomm_notes != doc.accommodations.notes) {
        doc.accommodations.notes = f.accomm_notes;
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
          success : function(resp) {
            $("input[name='_id']").val(resp.id);
            $("input[name='_rev']").val(resp.rev);
            // Pop-up the save confirmation.
            $("#saved_trigger").click();
            $("#continue_edit").focus();            
          }
        });
      } else {
        alert("No information changed since last save.");
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

//@ sourceURL=/vetedit/submit.js
