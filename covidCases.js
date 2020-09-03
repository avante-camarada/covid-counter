

var NUMBER_OF_PEOPLE_MAX = 100000;

function calculateNumberOfCases() {

    if(Date.now() < EVENT_END_DATE) {
        return 0;
    }

    if(Date.now() > EVENT_END_DATE) {
        return MAX_COVIDS;
    }

    var div = (EVENT_END_DATE - EVENT_START_DATE) / NUMBER_OF_PEOPLE_MAX;
    if (Date.now() > EVENT_START_DATE) {
        return NUMBER_OF_PEOPLE_MAX - ((EVENT_END_DATE - Date.now()) / div);
    }
}

function updateCasesCounter() {
    var cases = calculateNumberOfCases();
    $(".counter").text(cases)
}

setInterval(updateCasesCounter, 1000*60);
updateCasesCounter();