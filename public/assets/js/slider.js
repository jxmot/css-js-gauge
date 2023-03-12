/*
*/
function initSlider(gaugeId, value = 0) {
    $('#slider').attr('min', gauge_def[gaugeId].scale.from[0]);
    $('#slider').attr('max', gauge_def[gaugeId].scale.from[1]);
    $('#slider').val(value === 0 ? gauge_def[gaugeId].scale.from[0] : value);

    $('#slider-legend .slider-legend-low').text(gauge_def[gaugeId].scale.from[0]);
    $('#slider-legend .slider-legend-high').text(gauge_def[gaugeId].scale.from[1]);
    $('#slider-legend .slider-unit').text(gauge_def[gaugeId].unit);
    
    $('#slider').parent('.slider').parent('.slider-control').show();
};

/*
*/
$('#slider').on('input change', function(evt) {
    drawGauge(GAUGE_ID, evt.target.value);
});

