/*
*/
let low  = gauge_def[GAUGE_ID].scale.from[0];
let set  = low;
let high = gauge_def[GAUGE_ID].scale.from[1];
let mid = ~~(gauge_def[GAUGE_ID].scale.from[0]+(gauge_def[GAUGE_ID].scale.from[1] - gauge_def[GAUGE_ID].scale.from[0])/2);
let cnt = 40;

let dir = 1;
let dirlast = 0;
let tid = null;

function moveGauge() {
    drawGauge(GAUGE_ID, set);
    $('#slider').val(set);
    if(gauge_def[GAUGE_ID].trend.enable === true) {
        if(set === mid) {
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
        ((set+=dir) >= high ? dir = -1 : dir =  1) : 
        ((set+=dir) <= low  ? dir =  1 : dir = -1)
    );
};

/*
*/
$('#autorun').on('input change', function(evt) {
    if(evt.target.checked) {
        if(tid === null) {
            set = parseInt($(gauge_def[GAUGE_ID].id+' .gauge-value').text());
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
*/
$(function() {
    let val = ~~(gauge_def[GAUGE_ID].scale.from[0]+(gauge_def[GAUGE_ID].scale.from[1] - gauge_def[GAUGE_ID].scale.from[0])/2);
    initGauge(GAUGE_ID, val);
    initSlider(GAUGE_ID, val);
    drawGauge(GAUGE_ID, val);
});

