## Import

* How do you know if a guardian wants to fly again?
  * need historical flight 
  * copy?

## Basic UI

* Redo add-to-flight and pre-pairing vets.
* Veteran
  * What if valid phone number is not on app?
  * Separate Medical history form.
  * Medical Waiver

##Outputs

* CSV list outputs for reports.
* Enable filters for list views.

## Administration

## View Usage


Here’s the summary.

---

### Counts

- **Total Evently CouchDB views under `views/`:** **33** (one per folder; `reduce.js` files don’t add extra views).
- **Called by application code (or HTML):** **29**
- **Never called:** **4**

---

### Views that are called (29)

| View | Where it’s used |
|------|------------------|
| `flight_pairings` | `evently/flight_other`, `flight_detail`, `flight_medical`, `flight_gtcheckin` (async); `evently/flights/loggedIn/mustache.html` (_list tour lead) |
| `all_by_status_and_name` | `evently/finder/…/#last_name/keyup.js` (when status ≠ All, flight = All) |
| `all_by_name` | `evently/finder/…/#last_name/keyup.js` (default) |
| `all_by_flight_and_name` | `evently/finder/…/#last_name/keyup.js` (when flight ≠ All, status = All) |
| `all_by_type` | `evently/finder/loggedIn/mustache.html` (_list volunteer-full-csv) |
| `waitlist_guardians` | `evently/waitlist/…/#showGrds/click.js` (via `renderWaitlist` in `waitlist.js`) |
| `waitlist_guardians_active` | `evently/flight_assign/…/#addGrds/click.js` |
| `guardians_by_county` | `evently/flight_detail/…/button.modalInput/click.js` |
| `waitlist_veteran_groups` | `evently/vetedit/…/#showGroups/click.js`, `evently/flight_assign/…/#addVets/click.js` |
| `unpaired_veterans_by_last_name` | `evently/grdedit/…/#ByLastNameSearchSubmit/click.js` |
| `homecoming_destinations` | `evently/vetedit/…/#showDestinations/click.js`, `_attachments/script/flightother.js` |
| `waitlist_veterans_active` | `evently/flight_assign/…/#addVets/click.js` |
| `flights` | `evently/vetedit` and `evently/grdedit` async.js |
| `flight_assignment` | `evently/flight_assign/loggedIn/async.js` |
| `pair_by_grd_pref` | `evently/pairing/loggedIn/async.js` |
| `guardians_by_city` | `evently/flight_detail/…/button.modalInput/click.js` |
| `pair_by_vet_pref` | `evently/pairing/loggedIn/async.js` |
| `guardians_by_app_date` | `evently/flight_detail/…/button.modalInput/click.js` |
| `waitlist_veterans` | `evently/waitlist/…/#showVets/click.js` (via `renderWaitlist`) |
| `guardians_by_zip` | `evently/flight_detail/…/button.modalInput/click.js` |
| `all_by_phone_number` | `evently/finder/…/#phone_number_search/click.js` |
| `active_by_flight` | `evently/flights/loggedIn/mustache.html` (_list flight-csv, callcenterfollowup-csv) |
| `admin_recent_additions` | `evently/recent/…/#type/change.js` (Added) |
| `admin_recent_flight_changes` | `evently/recent/…/#type/change.js` (Flight) |
| `admin_recent_call_changes` | `evently/recent/…/#type/change.js` (Call Center) |
| `all_by_first_name` | `evently/finder/…/#first_name_search/click.js` |
| `admin_recent_pairing_changes` | `evently/recent/…/#type/change.js` (Pairing) |
| `admin_recent_changes` | `evently/recent/…/#type/change.js` (Modified) |
| `all_by_city` | `evently/finder/…/#city_search/click.js` |

“Called” includes both `app.db.view("basic/...")` (and `db.view(...)`) and use via `_list/.../viewName` in mustache HTML.

---

### Views that are never called (4)

1. **`all_by_phone_number2`** – no references in the repo (used in new API).
2. **`guardians_assigned_veterans`** – no references.
3. **`admin_duplicates`** – no references (likely for an admin duplicate-check UI that was never wired or was removed).
4. **`admin_conflicts`** – no references (same idea for conflict checking).

So: **29 of 33** views are used; **4** are unused.