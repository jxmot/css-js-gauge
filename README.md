# CSS/JS Gauge

This is a basic gauge implemented with CSS and JavaScript. It was inspired by this article - [Circular gradient stroke chart](https://nerdy.dev/gradient-outline-circular-chart)

These gists were also used here - 
* [fpillet/scale.js](https://gist.github.com/fpillet/993002)
* [av01d/ColorSteps.js](https://gist.github.com/av01d/538b3fffc78fdc273894d173a83c563f1)

## Overview

This gauge represents temperature in a range from 25 degrees to 120 degrees.

<div align="center">
    <figure>
        <img src="./mdimg/sshot-01.png" style="width:40%;border: 2px solid white"; alt="Gauge Screenshot" txt="Gauge Screenshot"/>
        <br>
        <figcaption><strong>Gauge Screenshot</strong></figcaption>
    </figure>
</div>

## Running The Demonstration

Open the `public/index.html` file directly in a browser.

## Details

Although this demo shows the gauge in °F the gauge can be configured for anything.

It also *shifts* color as the value transitions through configurable *ranges*.

The gauge is separate from the slider control and does not rely on it.

### Features

* Configurable:
  * Gauge Ranges - there can be one to N ranges, there is no limit except for what is within reason.
    * Range "top" limit - the "top" of the range is the maximum value for that range
    * Range Color - this is the color used while the value is in range
  * Gauge Dial Color Shift - when enabled the entire gauge color will gradually shift from one range to the next range's color as the value changes. The starting point of the shift is also configurable.
  * Gauge Thickness - the thickness of the gauge "arc".
  * Gauge dial range and orientation - the dial range can be from 0° and 360°, the orientation is created by defining a start and end in degrees.
  * Gauge units - text to use a a gauge "units" label, keep to 3 characters or less.
  * Scaling - this lets you scale your input range to the range (in degrees) of the gauge dial.

### Gauge Definition

`public/assets/js/gaugedefs.js` - 

```
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
// Gauge Units
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
    }
```

---
<img src="http://webexperiment.info/extcounter/mdcount.php?id=css-js-gauge">

