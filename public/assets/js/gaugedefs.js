/*
    Gauge Definitions
    
    
*/
let GAUGE_ID = 0;

/*
    Array of Gauge Definitions
*/
let gauge_def = [ 
    {
// Gauge element ID
        id: '#gauge_1',
        
// Gauge Value Ranges
        ranges: [
            {top:  60, shift: [], color: 'lightblue'},
            {top:  80, shift: [], color: 'green'},
            {top: 100, shift: [], color: 'yellow'},
            {top: 120, shift: [], color: 'red'},
        ],
// Gauge Dial Color Shift
        shift: {
            enable: true,
            steps: 10,
        },
// Scale Value to Dial Range
        scale: {
            from: [25,120],
            to: [0,180]
        },
// Value Units
        unit: '°F',
// Gauge Dial & Legend
        gauge: {
// Gauge Container Rotation
            container: -90,
// Gauge Display Rotation
            display: 90,
// Gauge Dial overall size & thickness
            dial: {
                size: '50vmin',
                thickness: '3rem'
            },
// Gauge Legend enable, font size & margin adjustment
            legend: {
                enable: true,
                fontsize: 'small',
                margintop: '2.5rem',
            },
        },
// Value Trend Indicator
        trend: {
            enable: true,
            last: null,
            up: './assets/img/trend_up-30x45.png',
            dn: './assets/img/trend_dn-30x45.png',
            eq: './assets/img/trend_eq-30x23.png',
            uk: './assets/img/trend_unk-29x46.png',
            bk: './assets/img/trend_blank-30x45.png',
        }
    },
    {
        id: '#gauge_2',
        ranges: [
            {top:  25, shift: [], color: 'orange'},
            {top:  45, shift: [], color: 'green'},
            {top:  90, shift: [], color: 'blue'},
        ],
        shift: {
            enable: true,
            steps: 5,
        },
        scale: {
            from: [0,90],
            to:   [0,90]
        },
        unit: '%RH',
        gauge: {
            container: -45,
            display: 45,
            dial: {
                size: '20vmin',
                thickness: '1rem'
            },
            legend: {
                enable: true,
                fontsize: 'small',
                margintop: '0.1rem',
            },
        },
        trend: {
            enable: false,
        },
    },
];

