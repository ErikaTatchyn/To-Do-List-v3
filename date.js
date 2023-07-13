


exports.getDate  =  function() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day  = new Date();

    var today = day.toLocaleDateString("en-US", options)

    return today
}


exports.getDay  = function() {
    var options = { weekday: 'long' };
    var day  = new Date();

    var today = day.toLocaleDateString("en-US", options)

    return today
}
