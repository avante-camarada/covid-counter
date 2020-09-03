var EVENT_START_DATE = new Date(2020, 08, 04, 15)
var EVENT_END_DATE = new Date(2020, 08, 04, 23)


$(document).ready(function () {
    initSound();
    generateCovid();
    setInterval(generateCovid, 1000 * 60);

    $('.covid').each(function (idx, e) {
        animateCovid($(e));
    });
});

function initSound() {
    var player = new Howl({
        src: ['/mp3/carvalhesa.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
}

var MIN_COVIDS = 5;
var MAX_COVIDS = 50;
function calculateNumberOfCovids() {

    if (Date.now() < EVENT_END_DATE) {
        return MIN_COVIDS;
    }

    if (Date.now() > EVENT_END_DATE) {
        return MAX_COVIDS;
    }

    var div = (EVENT_END_DATE - EVENT_START_DATE) / MAX_COVIDS;
    if (Date.now() > EVENT_START_DATE) {
        return MIN_COVIDS + MAX_COVIDS - ((EVENT_END_DATE - Date.now()) / div);
    }
}

function generateCovid() {
    var numberOfCovids = calculateNumberOfCovids();
    var existingCovids = $('.covid').length;
    if (numberOfCovids <= existingCovids) {
        return;
    }

    var createCovids = numberOfCovids - existingCovids;
    for (var n = 0; n < createCovids; ++n) {
        $("body").append("<img src='images/covid.png' class='covid' width='100' heigh='100' />")
    }
}

function makeNewPosition($container) {

    // Get viewport dimensions (remove the dimension of the div)
    $container = $(window)
    var h = $container.height() - 50;
    var w = $container.width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateCovid($target) {
    var newq = makeNewPosition($target);
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $($target).animate({
        top: newq[0],
        left: newq[1]
    }, speed, function () {
        animateCovid($target);
    });

}

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.1;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;
}