var EVENT_START_DATE = new Date(2020, 08, 04, 15)
var EVENT_END_DATE = new Date(2020, 08, 06, 23)


$(document).ready(function () {
    initSound();
    generateCovid();
    setInterval(generateCovid, 1000 * 60);

    $('.covid').each(function (idx, e) {
        animateCovid($(e));
    });
    $('#start-game').click(function (e) {
        alert('Vamos infectar os camaradas todos.');
        startGame();
    });
});

function initSound() {
    var player = new Howl({
        src: ['mp3/carvalhesa.mp3'],
        autoplay: true,
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

/************** INFECTA O CAMARADA */
var score = 0;
var color = "blue";

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setBG() {
    if (Math.round(Math.random())) {
        return "/game/img/corona.png";
    } else {
        return "/game/img/ze-povinho.png";
    }
}



function dropBox() {
    var length = random(100, ($(".game").width() - 100));
    var velocity = random(850, 10000);
    var size = random(50, 150);
    var thisBox = $("<div/>", {
        class: "box",
        style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
    });

    //set data and bg based on data
    thisBox.data("test", Math.round(Math.random()));
    if (thisBox.data("test")) {
        thisBox.css({ "background": "url('http://www.festadocovid.com/game/img/corona.png')", "background-size": "contain" });
    } else {
        thisBox.css({ "background": "url('http://www.festadocovid.com/game/img/ze-povinho.png')", "background-size": "contain" });
    }


    //insert gift element
    $(".game").append(thisBox);

    //random start for animation
    setTimeout(function () {
        thisBox.addClass("move");
    }, random(0, 5000));

    //remove this object when animation is over
    thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
            $(this).remove();
        });
}


$(document).on('click', '.box', function () {


    if ($(this).data("test")) {
        score += 1;
    } else {
        score -= 1;
    }

    $(".score").html(score);
    $(this).remove();
});



function countdown() {
    var seconds = 5;
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = (seconds < 10 ? "0" : "") + String(seconds) + "S";
        if (seconds > 0) {
            setTimeout(tick, 1000);
            draw();
            update();
        } else {
            alert("Game over");
            clearInterval(runGame);
            $('.game').hide();
        }
    }
    tick();
}

var runGame = setInterval(function () {
    for (i = 0; i < 10; i++) {
        dropBox();
    }
}, 5000);

function startGame() {
    $('.game').show();
    for (i = 0; i < 10; i++) {
        dropBox();
    }

    countdown();
}



