/*
    Run the CSS/JS Demonstration
*/

// initialization data and autorun variables
let low  = gauge_def[GAUGE_ID].scale.from[0];
let val  = low;
let high = gauge_def[GAUGE_ID].scale.from[1];
let mid = ~~(gauge_def[GAUGE_ID].scale.from[0]+(gauge_def[GAUGE_ID].scale.from[1] - gauge_def[GAUGE_ID].scale.from[0])/2);
let cnt = 40;
// the direction (increase vs decrease) of the autorun value
let dir = 1;
let dirlast = 0;

let tid = null;

/*
    Move the gauge to the next value, change direction 
    when necessary and pause in the midrange
*/
function moveGauge() {
    drawGauge(GAUGE_ID, val);
    $('#slider').val(val);
    if(gauge_def[GAUGE_ID].trend.enable === true) {
        if(val === mid) {
            cnt -= 1;
            if(cnt === 0) {
                cnt = 25;
                dir = dirlast;
            } else {
                dir = 0;
            }
        } else {
            dirlast = dir;
        }
    }
    (dir > 0 ? 
        ((val+=dir) >= high ? dir = -1 : dir =  1) : 
        ((val+=dir) <= low  ? dir =  1 : dir = -1)
    );
};

/*
    Start autorun
*/
$('#autorun').on('input change', function(evt) {
    if(evt.target.checked) {
        if(tid === null) {
            val = parseInt($(gauge_def[GAUGE_ID].id+' .gauge-value').text());
            tid = setInterval(moveGauge, 100);
        }
    } else {
        if(tid !== null) {
            clearInterval(tid); 
            tid = null;
        }
    }
});

/*
    Initialization
*/
$(function() {
    let val = ~~(gauge_def[GAUGE_ID].scale.from[0]+(gauge_def[GAUGE_ID].scale.from[1] - gauge_def[GAUGE_ID].scale.from[0])/2);
    initGauge(GAUGE_ID, val);
    initSlider(GAUGE_ID, val);
    drawGauge(GAUGE_ID, val);
});

