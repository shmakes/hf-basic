function() {
    var to = $(this).val();
    var from = $("#fromLetter").val();
    var pathName = $(location).attr('pathname');
    var search = $(location).attr('search');
    var urlSearchParams = new URLSearchParams(search);
    var params = Object.fromEntries(urlSearchParams.entries());
    params["from"] = from;
    params["to"]   = to;
    var newSearch = $.param(params);
    var newLoc = pathName + "?" + newSearch;
    window.location.href = newLoc;
};

//@ sourceURL=toLetter/change.js
