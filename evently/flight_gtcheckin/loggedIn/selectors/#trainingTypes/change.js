function() {
    var trainingType = $(this).val();
    var typeList = (trainingType.length > 0) ? trainingType.join(',') : "";
    var from = $("#fromLetter").val();
    var thru = $("#thruLetter").val();
    var pathName = $(location).attr('pathname');
    var search = $(location).attr('search');
    var urlSearchParams = new URLSearchParams(search);
    var params = Object.fromEntries(urlSearchParams.entries());
    params["from"] = from;
    params["thru"] = thru;
    params["type"] = typeList;
    var newSearch = $.param(params);
    var newLoc = pathName + "?" + newSearch;
    window.location.href = newLoc;
};

//@ sourceURL=trainingType/change.js
