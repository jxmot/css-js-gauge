/*
*/
let GAUGE_ID = 0;

/*
*/
let gauge_def = [ 
    {
        id: '#gauge_1',
        ranges: [
            {top:  60, color: 'lightblue'},
            {top:  80, color: 'green'},
            {top: 100, color: 'yellow'},
            {top: 120, color: 'red'},
        ],
        steps: [5, 5, 5, 5],
        scale: {
            from: [25,120],
            to: [0,180]
        },
        
    }
];

/*
*/
function scaleValueInt(value, from, to) {
	var scale = (to[1] - to[0]) / (from[1] - from[0]);
	var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
	return ~~(capped * scale + to[0]);
};

function scaleValueFloat(value, from, to) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
};

/*
*/
function drawGauge(gaugeId, value) {
    let gauge = $(gauge_def[gaugeId].id+' .gauge-dial');
    let disp  = $(gauge_def[gaugeId].id+' .gauge-value');
    for(ix = 0;ix < gauge_def[gaugeId].ranges.length; ix++) {
        if(value <= gauge_def[gaugeId].ranges[ix].top) {
            gauge.css('--color', gauge_def[gaugeId].ranges[ix].color);
            break;
        }
    }
    let deg = scaleValueInt(value, gauge_def[gaugeId].scale.from, gauge_def[gaugeId].scale.to);
    gauge.css('--angle', deg + 'deg');
    disp.text(value);  
};

/*
*/
let low = 32;
let set = low;
let high = 120;

let dir = 1;
let tid = null;

function moveGauge() {
    drawGauge(GAUGE_ID, set);
    $('#slider').val(set);
    (dir > 0 ? 
        ((set+=dir) >= high ? dir = -1 : dir = 1) : 
        (dir < 0 ? ((set+=dir) <= low ? dir = 1 : dir = -1) : dir = dir)
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
$('#slider').attr('min', gauge_def[GAUGE_ID].scale.from[0]);
$('#slider').attr('max', gauge_def[GAUGE_ID].scale.from[1]);
let mid = ~~(gauge_def[GAUGE_ID].scale.from[0]+(gauge_def[GAUGE_ID].scale.from[1] - gauge_def[GAUGE_ID].scale.from[0])/2);
$('#slider').val(mid);
drawGauge(GAUGE_ID, mid);

