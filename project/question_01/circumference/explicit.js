function explicit() {
  let radius = Number(document.getElementById("radius").value);
  let { centerXValue, centerYValue } = getUpdatedCenteredValues();

  explicit_circle(radius, centerXValue, centerYValue);

}

function explicit_circle (radius, centerXValue, centerYValue) {

  for(let x = -radius; x <= radius; x++) {
      let y = Math.sqrt(radius * radius - x * x);
      
      drawPixel(Math.round(centerXValue + x), Math.round(centerYValue + y));   // Octante E
      drawPixel(Math.round(centerXValue - x), Math.round(centerYValue + y));   // Octante W
      drawPixel(Math.round(centerXValue + x), Math.round(centerYValue - y));   // Octante S
      drawPixel(Math.round(centerXValue - x), Math.round(centerYValue - y));   // Octante N
      drawPixel(Math.round(centerXValue + y), Math.round(centerYValue + x));   // Octante NE
      drawPixel(Math.round(centerXValue - y), Math.round(centerYValue + x));   // Octante NW
      drawPixel(Math.round(centerXValue + y), Math.round(centerYValue - x));   // Octante SE
      drawPixel(Math.round(centerXValue - y), Math.round(centerYValue - x));   // Octante SW
  }
}
