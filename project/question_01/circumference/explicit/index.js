function explicit() {
    let radius = Number(document.getElementById("radius").value);
    let { centerXValue, centerYValue } = getUpdatedCenteredValues();

    explicit_circle(radius, centerXValue, centerYValue);

}

function explicit_circle (radius, centerXValue, centerYValue) {

    for(let x = -radius; x <= radius; x++) {
        let y = Math.sqrt(radius * radius - x * x);
        
        draw_pixel(Math.round(centerXValue + x), Math.round(centerYValue + y));   // Octante E
        draw_pixel(Math.round(centerXValue - x), Math.round(centerYValue + y));   // Octante W
        draw_pixel(Math.round(centerXValue + x), Math.round(centerYValue - y));   // Octante S
        draw_pixel(Math.round(centerXValue - x), Math.round(centerYValue - y));   // Octante N
        draw_pixel(Math.round(centerXValue + y), Math.round(centerYValue + x));   // Octante NE
        draw_pixel(Math.round(centerXValue - y), Math.round(centerYValue + x));   // Octante NW
        draw_pixel(Math.round(centerXValue + y), Math.round(centerYValue - x));   // Octante SE
        draw_pixel(Math.round(centerXValue - y), Math.round(centerYValue - x));   // Octante SW
    }
}
