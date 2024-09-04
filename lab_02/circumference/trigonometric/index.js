function trigonometric() {
  const radius = Number(document.getElementById("radius").value);
  const { centerXValue, centerYValue } = getUpdatedCenteredValues();

  for (let angle = 0; angle < 360; angle++) {
    const radian = angle * (Math.PI / 180);

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const [px, py] = [centerXValue + x, centerYValue - y];
    
    console.log({x, y})
    draw_pixel(px, py);
  }
}
