function trigonometric() {
  const radius = Number(document.getElementById("radius").value);
  const { centerXValue, centerYValue } = getUpdatedCenteredValues();

  for (let angle = 0; angle < 360; angle++) {
    const radian = angle * (Math.PI / 180);

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const [px, py] = [centerXValue + x, centerYValue - y];
    
    console.log({x, y})
    drawPixel(Math.round(px), Math.round(py));
  }

  if (systemData.transformationType === "translation") {
    const tx = Number(document.getElementById("tx").value);
    const ty = Number(document.getElementById("ty").value);

    for (let angle = 0; angle < 360; angle++) {
      const radian = angle * (Math.PI / 180);
  
      const x = radius * Math.cos(radian);
      const y = radius * Math.sin(radian);

      const [px, py] = [centerXValue + x + tx, centerYValue - y + ty];
      
      console.log({x, y})
      drawPixel(Math.round(px), Math.round(py), false, "#FF0000");
    }
  }

  if (systemData.transformationType === "scale") {
    const sx = Number(document.getElementById("sx").value);
    const sy = Number(document.getElementById("sy").value);

    for (let angle = 0; angle < 360; angle++) {
      const radian = angle * (Math.PI / 180);

      const x = radius * Math.cos(radian) * sx; 
      const y = radius * Math.sin(radian) * sy; 

      const [px, py] = [centerXValue + x, centerYValue - y];

      drawPixel(Math.round(px), Math.round(py), false, "#FF0000");
    }
  }
}