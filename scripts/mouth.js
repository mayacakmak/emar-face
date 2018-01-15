// Check this out for more mouth shapes:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths

function drawMouth() {

  var svg = document.getElementById("faceSVG");
  var rect = document.createElementNS(svgNS, "rect");
  var svgHeight = svg.clientHeight;
  var svgWidth = svg.clientWidth;
  var width = svgWidth * p.eyeWPercent / 100.0;
  var height = svgHeight * p.eyeHPercent / 100.0;

  /* Draw the rectangle first */
  rect.setAttribute("x", (50-p.mouthWPercent/2) + "%");
  rect.setAttribute("y", p.mouthYPercent + "%");
  rect.setAttribute("width", p.mouthWPercent + "%");
  rect.setAttribute("height", p.mouthH);
  rect.setAttribute("rx", p.mouthR);
  rect.setAttribute("ry", p.mouthR);
  rect.setAttribute("fill", p.mouthColor);
  svg.appendChild(rect);
}