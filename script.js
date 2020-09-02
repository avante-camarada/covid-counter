
$(document).ready(function() {
    $('.covid').each(function(idx, e) {
        animateCovid($(e));
    });
});

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
    }, speed, function() {
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