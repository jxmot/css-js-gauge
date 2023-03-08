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
            display: 45
        },
        trend: {
            enable: false,
        },
    },
];

