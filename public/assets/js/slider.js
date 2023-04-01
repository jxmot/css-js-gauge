/*
    Initialize a known slider with a gauge ID and an optional initial value
*/
function initSlider(gaugeId, value = 0) {
    // initialze the slider's minimum, maximum, and initial value
    $('#slider').attr('min', gauge_def[gaugeId].scale.from[0]);
    $('#slider').attr('max', gauge_def[gaugeId].scale.from[1]);
    $('#slider').val(value === 0 ? gauge_def[gaugeId].scale.from[0] : value);

    // initialize the slider's legend
    $('#slider-legend .slider-legend-low').text(gauge_def[gaugeId].scale.from[0]);
    $('#slider-legend .slider-legend-high').text(gauge_def[gaugeId].scale.from[1]);
    $('#slider-legend .slider-unit').text(gauge_def[gaugeId].unit);
    
    // show the slider, it was hidden until now
    $('#slider').parent('.slider').parent('.slider-control').show();
};

/*
    Handle slider events
*/
$('#slider').on('input change', function(evt) {
    drawGauge(GAUGE_ID, evt.target.value);
});

