var EVENT_START_DATE = new Date(2020, 08, 04, 15)
var EVENT_END_DATE = new Date(2020, 08, 06, 23)
var player;

$(document).ready(function () {
    initSound();
    generateCovid();
    setInterval(generateCovid, 1000 * 60);

    $('.covid').each(function (idx, e) {
        animateCovid($(e));
    });

    $('#start-game').click(function (e) {
        initGame();
    });
});

function initSound() {
    player = new Howl({
        src: ['mp3/carvalhesa.mp3'],
        loop: true,
        volume: 0.5
    });
    player.seek(27);
}

var MIN_COVIDS = 5;
var MAX_COVIDS = 50;
function calculateNumberOfCovids() {

    if (Date.now() < EVENT_START_DATE) {
        return MIN_COVIDS;
    }

    if (Date.now() > EVENT_END_DATE) {
        return MAX_COVIDS;
    }

    var div = (EVENT_END_DATE - EVENT_START_DATE) / MAX_COVIDS;
    return MIN_COVIDS + MAX_COVIDS - ((EVENT_END_DATE - Date.now()) / div);
}

function generateCovid() {
    var numberOfCovids = calculateNumberOfCovids();
    var existingCovids = $('.covid').length;
    if (numberOfCovids <= existingCovids) {
        return;
    }

    var createCovids = numberOfCovids - existingCovids;
    for (var n = 0; n < createCovids; ++n) {
        $(".container").append("<img src='images/covid.png' class='covid' width='100px' heigh='100px' />")
    }
}

function makeNewPosition($target) {

    // Get viewport dimensions (remove the dimension of the div)
    $container = $(window)
    var h = $container.height() - $target.height();
    var w = $container.width() - $target.width();

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [ nh, nw ];

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

/************** INFECTA O CAMARADA */

function gameEnded(){
  player.stop();

  $('#wrapper').remove();
  $('.container').show();
}


function initGameWrapper() {
    $('body').append("<div id=\"wrapper\" class=\"fullHeight\"><div class=\"game\"><div class=\"game-counter\" id=\"counter\">00s</div><div class=\"score\">0</div></div></div>");
}


function initGame(){
  $('.container').hide();

  player.play();

  initGameWrapper();

  alert('Infecta os Camaradas!');
  startGame( gameEnded );
}
