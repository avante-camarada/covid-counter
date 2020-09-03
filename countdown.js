

const second = 1000,
minute = second * 60,
hour = minute * 60,
day = hour * 24;

let countDown_start = EVENT_START_DATE.getTime();
let countDown_end = EVENT_END_DATE.getTime();

function calculateTime() {
    if(Date.now() > EVENT_END_DATE) {
        $("#start_countdown").hide();
        $("#end_countdown").hide();
        $("#end_party").show();

        return;
    }

    if(Date.now() < EVENT_START_DATE) {
        $("#start_countdown").show();

        let now = new Date().getTime(),
            distance = countDown_start - now;

        document.getElementById('days_start').innerText = Math.floor(distance / (day)),
        document.getElementById('hours_start').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes_start').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds_start').innerText = Math.floor((distance % (minute)) / second);
    } else {
        $("#start_countdown").hide();
        $("#end_countdown").show();

        let now = new Date().getTime(),
            distance = countDown_end - now;

        document.getElementById('days_end').innerText = Math.floor(distance / (day)),
        document.getElementById('hours_end').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes_end').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds_end').innerText = Math.floor((distance % (minute)) / second);
    }
}

setInterval(function() {    
    calculateTime();
}, second);

calculateTime();