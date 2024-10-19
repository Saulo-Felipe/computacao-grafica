function explicit_circle () {
    const radius = Number(document.getElementById("radius").value);
    const { centerXValue, centerYValue } = getUpdatedCenteredValues();

    for(let x = -radius; x <= radius; x++) {
        let y = Math.sqrt(radius * radius - x * x);

        draw_pixel(centerXValue + x, centerYValue + y)   //Octante E
        draw_pixel(centerXValue - x, centerYValue + y)  //#Octante W
        draw_pixel(centerXValue + x, centerYValue - y)  //#Octante S
        draw_pixel(centerXValue - x, centerYValue - y)  //#Octante N
        draw_pixel(centerXValue + y, centerYValue + x)  //#Octante NE
        draw_pixel(centerXValue - y, centerYValue + x)  //#Octante N
        draw_pixel(centerXValue + y, centerYValue - x)  //#Octante SE
        draw_pixel(centerXValue - y, centerYValue - x)  //#Octante SW
    }
}
