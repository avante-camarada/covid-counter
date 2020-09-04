var runGame = 0;
var score = 0;


function random(min,max){
 	return Math.round(Math.random() * (max-min) + min);
}


function dropBox(){
  var length = random(100, ($(".game").width() - 100));
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
  $(".game").append(thisBox);
  
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
    	var seconds = 60;

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
	clearInterval( runGame );
	runGame = 0;

	alert( score + " Zé Povinho\nsalvo" + ((score==1 || score==-1 )? "" : "s") + " do COVID.\n\nGame over !");
}


function startGame(){
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