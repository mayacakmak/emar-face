var p = {
  backgroundColor:"#E3B265",
  eyeCenterDistPercent:25,
  eyeYPercent:50,
  isLEDEyes:1,
  /* V1 style eyes*/
  eyeOuterRadiusPercent:15,
  eyeInnerRadiusPercent:5,
  eyeOuterColor:"#FFD",
  eyeInnerColor:"#000",
  backgroundColor:"#000",
  hasEyeLines:1,
  eyeLineStrokeWidth:10,
  /* V2 style eyes*/
  eyeWPercent:30,
  eyeHPercent:50,
  betweenCircleDistancePercent:15,
  eyeBackgroundColor:"#222",
  eyeLEDOffColor:"#444",
  eyeLEDOnColor:"#86CCEE",
  nCircles:9,
  hasText:1,
  text:"Hello, my name is EMAR",
  avgBlinkTime: 10000,
  /* Mouth */
  hasMouth: 1,
  mouthWPercent: 10,
  mouthYPercent: 80,
  mouthH: 25,
  mouthR: 5,
  mouthColor: "#222222",
  eyePupilRadius: 10,
  eyePupilRadiusPercent: 2,
  eyePupilColor: "#AAAAAA",
}

var newParameters;
/* Other globals */
var svgNS = "http://www.w3.org/2000/svg";
var blinkTimeoutHandle = null;

/* Callback function for when the parameter database is updated*/
function updateParameters(snapshot) {
  newParameters = snapshot.val();
  
  for (var i=0; i<Object.keys(newParameters).length; i++)
  {
    var key = Object.keys(newParameters)[i];
    var param = newParameters[key];
    if (param.type == "number" || param.type == "boolean") {
      p[key] = Number(newParameters[key].current);
    }
    else {
      p[key] = String(newParameters[key].current);
    }
  }
  drawFace();
}