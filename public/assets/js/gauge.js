/*
*/
function initGauge(gaugeId, value = 0) {
    $(':root').css('--dial-thickness', gauge_def[gaugeId].gauge.dial.thickness);
    $(':root').css('--legend-fontsize', gauge_def[gaugeId].gauge.legend.fontsize);
    $(':root').css('--legend-margintop', gauge_def[gaugeId].gauge.legend.margintop);
    
    $(gauge_def[gaugeId].id+' .gauge-dial').css('--dial-size', gauge_def[gaugeId].gauge.dial.size);
    
    $(gauge_def[gaugeId].id+' .gauge-legend-low').text(gauge_def[gaugeId].scale.from[0]);
    $(gauge_def[gaugeId].id+' .gauge-legend-high').text(gauge_def[gaugeId].scale.from[1]);
    $(gauge_def[gaugeId].id+' .gauge-unit').text(gauge_def[gaugeId].unit);
    $(gauge_def[gaugeId].id+' .gauge-value').text(value);

    $(gauge_def[gaugeId].id).parent('.gauge-container').css('--container-rotate', gauge_def[gaugeId].gauge.container+'deg');
    $(gauge_def[gaugeId].id+' .gauge-display').css('--display-rotate', gauge_def[gaugeId].gauge.display+'deg');

    for(ix = 0;ix < gauge_def[gaugeId].ranges.length; ix++) {
        if(value <= gauge_def[gaugeId].ranges[ix].top) {
            $(gauge_def[gaugeId].id+' .gauge-dial').css('--dial-color', gauge_def[gaugeId].ranges[ix].color)
            break;
        }
    }

    $(gauge_def[gaugeId].id).show();
    $(gauge_def[gaugeId].id).parent('.gauge-container').show();
};

/*
*/
function drawGauge(gaugeId, value) {
    let gauge = $(gauge_def[gaugeId].id+' .gauge-dial');
    let disp  = $(gauge_def[gaugeId].id+' .gauge-value');
    let trend = $(gauge_def[gaugeId].id+' .gauge-trend');
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
                gauge.css('--dial-color', gauge_def[gaugeId].ranges[ix].shift[cidx]);
                break;
            }
        } else {
            if(value <= gauge_def[gaugeId].ranges[ix].top) {
                gauge.css('--dial-color', gauge_def[gaugeId].ranges[ix].color);
                break;
            }
        }
    }
    let deg = scaleValueInt(value, gauge_def[gaugeId].scale.from, gauge_def[gaugeId].scale.to);
    gauge.css('--value-angle', deg + 'deg');
    disp.text(value);
    
    if(gauge_def[gaugeId].trend.enable === true) {
        let img = (gauge_def[gaugeId].trend.last === null ? gauge_def[gaugeId].trend.bk : 
                  (gauge_def[gaugeId].trend.last > value ? gauge_def[gaugeId].trend.dn :
                  (gauge_def[gaugeId].trend.last < value ? gauge_def[gaugeId].trend.up :
                  (gauge_def[gaugeId].trend.last === value ? gauge_def[gaugeId].trend.eq : gauge_def[gaugeId].trend.uk )))
                  );
        trend.attr('src', img);
        
        gauge_def[gaugeId].trend.last = value;
    }
};

