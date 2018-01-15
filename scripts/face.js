function drawFace() {
  
  var wholePage = document.getElementsByClassName("facewrapper")[0];
  if (wholePage == null)
    wholePage = document.getElementsByClassName("wrapper")[0];
  wholePage.style.backgroundColor = p.backgroundColor;
  
  var speechBubble = document.getElementById("robotSpeech");
  if (p.hasText) {
    speechBubble.innerHTML = p.text;
  }
  else {
    speechBubble.innerHTML = "";
  }

  var svg = document.getElementById("faceSVG");
  svg.innerHTML = "";
    
  if (p.isLEDEyes == 0)
    drawV1Eyes();
  else
    drawV2Eyes();
  
  if (p.hasMouth)
    drawMouth();
  
}