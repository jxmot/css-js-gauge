/*
*/
function initSlider(gaugeId, value = 0) {
    $('#slider').attr('min', gauge_def[gaugeId].scale.from[0]);
    $('#slider').attr('max', gauge_def[gaugeId].scale.from[1]);
    $('#slider').val(value === 0 ? gauge_def[gaugeId].scale.from[0] : value);

    $('#slider-legend .slider-legend-low').text(gauge_def[gaugeId].scale.from[0]);
    $('#slider-legend .slider-legend-high').text(gauge_def[gaugeId].scale.from[1]);
    $('#slider-legend .slider-unit').text(gauge_def[gaugeId].unit);
    
    $('.gauge-controls').show();
};

/*
*/
function initGauge(gaugeId, value = 0) {
    $(gauge_def[gaugeId].id+' .gauge-legend-low').text(gauge_def[gaugeId].scale.from[0]);
    $(gauge_def[gaugeId].id+' .gauge-legend-high').text(gauge_def[gaugeId].scale.from[1]);
    $(gauge_def[gaugeId].id+' .gauge-unit').text(gauge_def[gaugeId].unit);
    $(gauge_def[gaugeId].id+' .gauge-value').text(value);

    $(gauge_def[gaugeId].id).parent('.gauge-container').css('--rotate', gauge_def[gaugeId].gauge.container+'deg');
    $(gauge_def[gaugeId].id+' .gauge-display').css('--rotate', gauge_def[gaugeId].gauge.display+'deg');

    $(gauge_def[gaugeId].id).show();
    $(gauge_def[gaugeId].id).parent('.gauge-container').show();
};

/*
*/
function drawGauge(gaugeId, value) {
    let gauge = $(gauge_def[gaugeId].id+' .gauge-dial');
    let disp  = $(gauge_def[gaugeId].id+' .gauge-value');
    for(ix = 0;ix < gauge_def[gaugeId].ranges.length; ix++) {
        if(gauge_def[gaugeId].shift.enable === true) {
            if(gauge_def[gaugeId].ranges[ix].shift.length === 0) {
                let fcol = gauge_def[gaugeId].ranges[ix].color;
                let tidx = (ix < (gauge_def[gaugeId].ranges.length - 1) ? ix+1 : ix);
                let tcol = gauge_def[gaugeId].ranges[tidx].color;;
                gauge_def[gaugeId].ranges[ix].shift = ColorSteps.getColorSteps(fcol, tcol, 
                                                                 gauge_def[gaugeId].shift.steps);
            }
            let start = gauge_def[gaugeId].ranges[ix].top - gauge_def[gaugeId].shift.steps;
            if((value >= start) && (value <= gauge_def[gaugeId].ranges[ix].top)) {
                let cidx = gauge_def[gaugeId].shift.steps - (gauge_def[gaugeId].ranges[ix].top - value);
                gauge.css('--color', gauge_def[gaugeId].ranges[ix].shift[cidx]);
                break;
            }
        } else {
            if(value <= gauge_def[gaugeId].ranges[ix].top) {
                gauge.css('--color', gauge_def[gaugeId].ranges[ix].color);
                break;
            }
        }
    }
    let deg = scaleValueInt(value, gauge_def[gaugeId].scale.from, gauge_def[gaugeId].scale.to);
    gauge.css('--angle', deg + 'deg');
    disp.text(value);  
};

/*
*/
let low  = gauge_def[GAUGE_ID].scale.from[0];
let set  = low;
let high = gauge_def[GAUGE_ID].scale.from[1];

let dir = 1;
let tid = null;

function moveGauge() {
    drawGauge(GAUGE_ID, set);
    $('#slider').val(set);
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
$('#slider').on('input change', function(evt) {
    drawGauge(GAUGE_ID, evt.target.value);
});

/*
*/
$(function() {
    let mid = ~~(gauge_def[GAUGE_ID].scale.from[0]+(gauge_def[GAUGE_ID].scale.from[1] - gauge_def[GAUGE_ID].scale.from[0])/2);
    
    initGauge(GAUGE_ID, mid);
    initSlider(GAUGE_ID, mid);
    drawGauge(GAUGE_ID, mid);
});

