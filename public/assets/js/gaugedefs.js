/*
*/
let GAUGE_ID = 0;

/*
*/
let gauge_def = [ 
    {
        id: '#gauge_1',
        ranges: [
            {top:  60, shift: [], color: 'lightblue'},
            {top:  80, shift: [], color: 'green'},
            {top: 100, shift: [], color: 'yellow'},
            {top: 120, shift: [], color: 'red'},
        ],
        shift: {
            enable: true,
            steps: 10, //5,
        },
        scale: {
            from: [25,120],
            to: [0,180]
        },
        unit: '°F',
        gauge: {
            container: -90,
            display: 90
        },
    }
];

