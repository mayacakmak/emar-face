function drawV1Eyes() {
  if (blinkTimeoutHandle !== null) {
    window.clearTimeout(blinkTimeoutHandle);
  }
  var nextBlink = Math.random()*p.avgBlinkTime;
  blinkTimeoutHandle = window.setTimeout(blink, nextBlink);
  
  drawV1Eye(50-p.eyeCenterDistPercent, "Left");
  drawV1Eye(50+p.eyeCenterDistPercent, "Right");
}

function blink() {
  var closeRightEyeAnim = document.getElementById("closeEyeLeft");
  var closeLeftEyeAnim = document.getElementById("closeEyeRight");
  closeRightEyeAnim.beginElement();
  closeLeftEyeAnim.beginElement();
  var nextBlink = Math.random()*10000;
  blinkTimeoutHandle = window.setTimeout(blink, nextBlink);
}

function drawV1Eye(eyeXPercent, name) {
  drawEyeCircle(eyeXPercent, p.eyeYPercent, p.eyeOuterRadiusPercent, p.eyeOuterColor, name, true);
  if (p.hasEyeLines)
    drawEyeLines(eyeXPercent, p.eyeYPercent, p.eyeOuterRadiusPercent, p.backgroundColor, p.eyeLineStrokeWidth);
  drawEyeCircle(eyeXPercent, p.eyeYPercent, p.eyeInnerRadiusPercent, p.eyeInnerColor, name, false);
  if (p.hasPupil)
    drawEyeCircle(eyeXPercent, p.eyeYPercent+10, p.eyePupilRadiusPercent, p.eyePupilColor, name, false);
}

function drawEyeCircle(xPercent, yPercent, radiusPercent, color, name, isBlinking) {
  var svg = document.getElementById('faceSVG');
  var svgWidth =  svg.clientWidth;
  var radius = Math.round(svgWidth*radiusPercent/100.0);
  drawEyeCircleWithRadius(xPercent, yPercent, radius, color, name, isBlinking);
}

function drawEyeCircleWithRadius(xPercent, yPercent, radius, color, name, isBlinking) {
  var svg = document.getElementById('faceSVG');
  var circle = document.createElementNS(svgNS, "ellipse");
  var svgHeight =  svg.clientHeight;
  var svgWidth =  svg.clientWidth;

  circle.setAttribute("cx", xPercent + "%");
  circle.setAttribute("cy", yPercent + "%");
  circle.setAttribute("rx", radius);
  circle.setAttribute("ry", radius);
  circle.setAttribute("fill", color);
  
  if (isBlinking) {
    var blinkClose = document.createElementNS(svgNS, "animate");
    blinkClose.setAttribute("id", "closeEye"+name);
    blinkClose.setAttribute("attributeName", "ry");
    blinkClose.setAttribute("from", radius);
    blinkClose.setAttribute("to", "0");
    blinkClose.setAttribute("dur", "0.1s");
    circle.appendChild(blinkClose);

    var blinkOpen = document.createElementNS(svgNS, "animate");
    blinkOpen.setAttribute("id", "openEye"+name);
    blinkOpen.setAttribute("attributeName", "ry");
    blinkOpen.setAttribute("from", "0");
    blinkOpen.setAttribute("to", radius);
    blinkOpen.setAttribute("dur", "0.02s");
    blinkOpen.setAttribute("begin", "closeEye"+name+".end");
    circle.appendChild(blinkOpen);
  }
  
  svg.appendChild(circle);
  
}

function drawEyeLines(xPercent, yPercent, radiusPercent, color, strokeWidth) {

  var svg = document.getElementById('faceSVG');
  var svgHeight =  svg.clientHeight;
  var svgWidth =  svg.clientWidth;
  var radius = Math.round(svgWidth*radiusPercent/100.0);
  var x = Math.round(svgWidth*xPercent/100.0);
  var y = Math.round(svgHeight*yPercent/100.0);
  drawLine(x-radius, y-radius, x+radius, y+radius, color, strokeWidth);
  drawLine(x-radius, y, x+radius, y, color, strokeWidth);
  drawLine(x+radius, y-radius, x-radius, y+radius, color, strokeWidth);
  drawLine(x, y-radius, x, y+radius, color, strokeWidth);
}

function drawLine(x1, y1, x2, y2, color, strokeWidth) {
  var svg = document.getElementById('faceSVG');
  var line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.style.stroke = color;
  line.style.strokeWidth = strokeWidth;
  svg.appendChild(line);
}