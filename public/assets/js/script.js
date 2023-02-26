function drawgauge(gauge, disp, value) {
  if(value <= 66) {
      gauge.css('--color', 'lightblue');
  } else if(value <= 85) {
      gauge.css('--color', 'green');
  } else if(value <= 100) {
      gauge.css('--color', 'yellow');
  } else {
      gauge.css('--color', 'red');
  }
  gauge.css('--ng', value + 'deg');
  disp.text(value);  
};

ng.oninput = e => {
  drawgauge($('#gauge_1 .gauge-dial'), $('#gauge_1 .gauge-value'), e.target.value);
};

let low = 32;
let set = low;
let high = 120;

let dir = 1;

let tid = null;

function moveGauge() {
    drawgauge($('#gauge_1 .gauge-dial'), $('#gauge_1 .gauge-value'), set);
    ng.value = set;
    (dir > 0 ? 
        ((set+=dir) >= high ? dir = -1 : dir = 1) : 
        (dir < 0 ? ((set+=dir) <= low ? dir = 1 : dir = -1) : dir = dir)
    );
};

autorun.onchange = e => {
    if(e.target.checked) {
        if(tid === null) {
            set = parseInt($('#gauge_1 .gauge-value').text());
            tid = setInterval(moveGauge, 100);
        }
    } else {
        if(tid !== null) {
            clearInterval(tid); 
            tid = null;
        }
    }
};

