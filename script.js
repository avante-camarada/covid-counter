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
        alert('Infecta todos os Camaradas!');
        startGame();
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
        $(".container").append("<img src='images/covid.png' class='covid' width='100' heigh='100' />")
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
var runGame = 0;
var score = 0;


function random(min,max){
 	return Math.round(Math.random() * (max-min) + min);
}


function dropBox(){
  var gameDiv = $(".game");
  var length = random(100, (gameDiv.width() - 100));
  var velocity = random(850, 10000);
  var size = random(50, 150);
  var thisBox = $("<div/>", {
    class: "box",
    style:  "width:" +size+ "px; height:"+size+"px; left:" + length+  "px; transition: transform " +velocity+ "ms linear;"
  });
  
  //set data and bg based on data
  thisBox.data("test", Math.round(Math.random()));
  if(thisBox.data("test")){
    thisBox.css({"background": "url('https://www.festadocovid.com/game/img/ze-povinho.png')", "background-size":"contain"});
  } else {
    thisBox.css({"background": "url('https://www.festadocovid.com/game/img/corona.png')", "background-size":"contain"});
  }
  
  //insert box element
  gameDiv.append(thisBox);
  
  //random start for animation
  setTimeout(function(){
    thisBox.addClass("move");
  }, random(0, 5000) );
  
  //remove this object when animation is over
  thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
    function(event) {
    	$(this).remove();
  	});
}


$(document).on('click', '.box', function(){
  
  if($(this).data("test")){
    score += 1;
  } else {
    score -= 1;
  }
  
  $(".score").html(score);
  $(this).remove();
});


function countdown() {
    	var seconds = 30;

	    function tick() {
	        var counter = document.getElementById("counter");

            seconds--;
	        counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + " S";

	        if( seconds > 0 ) {
	            setTimeout(tick, 1000);
	        } else {
	        	finishGame();
	        }
	    }

    	tick();
	}


function finishGame(){
    player.stop();
    clearInterval( runGame );
    $('.game').remove();
    $('.container').show();
	runGame = 0;
    alert( score + " Camaradas Infectados\n\nGame over !");
    score = 0;
}

function initGameContainer() {
    $('body').append("<div class=\"game\"><div class=\"game-counter\" id=\"counter\">00s</div><div class=\"score\">00</div></div>");
}

function startGame(){
    player.play();
    initGameContainer();
    $('.container').hide();
	for (i = 0; i < 10; i++) { 
	  dropBox();
	}

	runGame =
		setInterval(
			function(){
                for (i = 0; i < 5; i++) { 
                  dropBox();
                }  
            }, 2500);

	countdown();
}