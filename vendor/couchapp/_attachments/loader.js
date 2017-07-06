
function couchapp_load(scripts) {
  document.write(scripts.map(function(s) {
    return '<script src="'+s+'"></script>';
  }).join(''));  
};

couchapp_load([
  "/_utils/script/json2.js",
  "https://code.jquery.com/jquery-1.6.2.min.js",
  "/_utils/script/jquery.couch.js",
  "vendor/couchapp/jquery.couch.app.js",
  "vendor/couchapp/jquery.couch.app.util.js",
  "vendor/couchapp/jquery.mustache.js",
  "vendor/couchapp/jquery.pathbinder.js",
  "vendor/couchapp/jquery.evently.js",
  "script/app.js"
]);
