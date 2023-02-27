/*
Usage example:

let colors;
colors = ColorSteps.getColorSteps('#000', 'rgba(255,0,0,0.1)', 10);
colors = ColorSteps.getColorSteps('red', 'blue', 5);
colors = ColorSteps.getColorSteps('hsl(180, 50%, 50%)', 'rgba(200,100,20,0.5)', 10);
*/
const ColorSteps = (() => {

  /**
   * Convert any color string to an [r,g,b,a] array.
   * @author Arjan Haverkamp (arjan-at-avoid-dot-org)
   * @param {string} color Any color. F.e.: 'red', '#f0f', '#ff00ff', 'rgb(x,y,x)', 'rgba(r,g,b,a)', 'hsl(180, 50%, 50%)'
   * @returns {array} [r,g,b,a] array. Caution: returns [0,0,0,0] for invalid color.
   * @see https://gist.github.com/av01d/8f068dd43447b475dec4aad0a6107288
   */
  const colorValues = color => {
    const div = document.createElement('div');
    div.style.backgroundColor = color;
    document.body.appendChild(div);
    let rgba = getComputedStyle(div).getPropertyValue('background-color');
    div.remove();

    if (rgba.indexOf('rgba') === -1) {
      rgba += ',1'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
    }

    return rgba.match(/[\.\d]+/g).map(a => {
      return +a
    });
  }

  /**
   * Get color steps (gradient) between two colors.
   * @author Arjan Haverkamp (arjan-at-avoid-dot-org)
   * @param {string} colorStart Any color. F.e.: 'red', '#f0f', '#ff00ff', 'rgb(x,y,x)', 'rgba(r,g,b,a)', 'hsl(180, 50%, 50%)'
   * @param {string} colorEnd Any color
   * @param {int} steps Number of color steps to return
   * @returns {array} Array of 'rgb(r,g,b)' or 'rgba(r,g,b,a)' arrays
   */
  const getColorSteps = (colorStart, colorEnd, steps) => {
    const start = colorValues(colorStart),
      end = colorValues(colorEnd),
      opacityStep = (end[3] * 100 - start[3] * 100) / steps,
      colors = [];
    let alpha = 0, opacity = start[3] * 100;

    for (let i = 0; i < steps; i++) {
      alpha += 1.0 / steps;
      opacity += opacityStep;

      let c = [
        Math.round(end[0] * alpha + (1 - alpha) * start[0]),
        Math.round(end[1] * alpha + (1 - alpha) * start[1]),
        Math.round(end[2] * alpha + (1 - alpha) * start[2])
      ];

      colors.push(
        opacity == 100 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${opacity/100})`
      );
    }

    return colors;
  }

  return {
    colorValues,
    getColorSteps
  }
})();
