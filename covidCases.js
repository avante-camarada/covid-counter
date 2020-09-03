

var NUMBER_OF_PEOPLE_MAX = 100000;

function calculateNumberOfCases() {

    if(Date.now() < EVENT_START_DATE) {
        return 0;
    }

    if(Date.now() > EVENT_END_DATE) {
        return NUMBER_OF_PEOPLE_MAX;
    }

    var div = (EVENT_END_DATE - EVENT_START_DATE) / NUMBER_OF_PEOPLE_MAX;
    return NUMBER_OF_PEOPLE_MAX - ((EVENT_END_DATE - Date.now()) / div);
}

function updateCasesCounter() {
    var cases = Math.floor(calculateNumberOfCases());
    $(".counter").text(formatNumber(cases, 0))
}

function formatNumber(n, dp){
    var w = n.toFixed(dp), k = w|0, b = n < 0 ? 1 : 0,
        u = Math.abs(w-k), d = (''+u.toFixed(dp)).substr(2, dp),
        s = ''+k, i = s.length, r = '';
    while ( (i-=3) > b ) { r = ',' + s.substr(i, 3) + r; }
    return s.substr(0, i + 3) + r + (d ? '.'+d: '');
  };

setInterval(updateCasesCounter, 5000);
updateCasesCounter();