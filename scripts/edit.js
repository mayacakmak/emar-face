// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZveTmVgPoOD6vNTu_L1kg-7zNPO3t27g",
  authDomain: "emar-face.firebaseapp.com",
  databaseURL: "https://emar-face.firebaseio.com",
  projectId: "emar-face",
  storageBucket: "emar-face.appspot.com",
  messagingSenderId: "613612121756"
};

/*Initialize this webpage as a Firebase application*/
var app = firebase.initializeApp(config);
/*Create an Google OAuth provider instance*/
var provider = new firebase.auth.GoogleAuthProvider();
/*Register a callback function for when Auth status changes*/
firebase.auth().onAuthStateChanged(handleAuthStateChange);

function setupOAuth() {
  /*Get a database instance and register value change callback*/
  var dbRef = firebase.database().ref('/');
  dbRef.on("value", createScales);
}

function handleAuthStateChange(user) {
  if (user) {
      addUserInfo(user.displayName);
    } else {
      addSignInButton();    
   }
}

function addSignInButton() {
    var loginDiv = document.getElementById("top");
    loginDiv.innerHTML = '<div class="signinButton">' + 
                          '<input type=button value="Sign in with Google" onclick="getAuth()">'+
                          '</input> </div>';
}

function getAuth() {
  firebase.auth().signInWithRedirect(provider);
}

function addUserInfo(name) {
    var loginDiv = document.getElementById("top");
    loginDiv.innerHTML = '<div class="signinInfo">' +
      '<input type=button value="Sign out" onclick="signOut()">' + 
      '</input> </div> <div class="signinInfo">' + 
      'Logged in as ' + name + '</div>';
}

function signOut() {
  firebase.auth().signOut();  
}

function createScales(snapshot) {
  updateParameters(snapshot);
  var params = snapshot.val();
  var scaleExample = document.getElementById("eyeCenterDistPercent");
  if (scaleExample == null) {
    var mainDiv = document.getElementById("main");
    
    /* Number type parameters, selected with sliders*/
    for (var i=0; i<Object.keys(params).length; i++)
    {
      var key = Object.keys(params)[i];
      var param = params[key];
      if (param.type == "number")
      {
        mainDiv.appendChild(
          createRangeInput(key, param.current, param.min, param.max, 10));
      }
    }
    
    /* Color parameters */
    for (var i=0; i<Object.keys(params).length; i++)
    {
      var key = Object.keys(params)[i];
      var param = params[key];
      if (param.type == "color") {
          createColorInput(key, param.current);
      }
    }
    
    /* Boolean/binary parameters */
    for (var i=0; i<Object.keys(params).length; i++)
    {
      var key = Object.keys(params)[i];
      var param = params[key];
      if (param.type == "boolean") {
         createBooleanInput(key, param.current, ['a', 'b'])  
      }
    }
    
  } 
  else {
    console.log("Scales already exist.");
  }
  
}

function createBooleanInput(name, current, optionNames) {
  var boolPickers = document.getElementsByClassName("boolPicker");
  
  var radio1 = ' Yes <input type="radio" onchange="newParameterValue(this)" ' +
      ' name = ' + name + ' value=1 ';
  var radio2 = ' No <input type="radio" onchange="newParameterValue(this)" ' +
      ' name = ' + name + ' value=0 ';
        
  if (current==1) {
    radio1 += ' checked>';
    radio2 += '>';
  }
  else {
    radio2 += ' checked>';
    radio1 += '>';
  }

  var boolSelectorHTML = '<div class="sliderName"> ' + name + ':</div>' +
      '<div>' + radio1 + radio2 + '</div>';
  
  var mainDiv = document.getElementById("main");
  if (boolPickers.length > 0) {
    var boolPicker = boolPickers[0];
    boolPicker.innerHTML += boolSelectorHTML
  }
  else {
    var boolPicker = document.createElement("div");
    boolPicker.className = "boolPicker";
    boolPicker.innerHTML = boolSelectorHTML;
    mainDiv.appendChild(boolPicker);
  }
}

function createColorInput(name, current) {
  var colorPickers = document.getElementsByClassName("colorPicker");
  var mainDiv = document.getElementById("main");
  if (colorPickers.length > 0) {
    var colorPicker = colorPickers[0];
    colorPicker.innerHTML += '<div class="sliderName"> ' + name + ':</div>' +
      '<div> <input type="color" onchange="newParameterValue(this)" ' +
      ' name = ' + name +
      ' value="' + current + '"> </div>'
  }
  else {
    var colorPicker = document.createElement("div");
    colorPicker.className = "colorPicker";
    colorPicker.innerHTML = '<div class="sliderName"> ' + name + ':</div>' +
      '<div> <input type="color" onchange="newParameterValue(this)" ' +
      ' name = ' + name +
      ' value="' + current + '"> </div>';
    mainDiv.appendChild(colorPicker);
  }
}

function createRangeInput(name, current, min, max, nIncrements) {
  var scale = document.createElement("div");
  scale.className = "scale";
  scale.id = name;
  scale.innerHTML = getRangeHTML(name, current, min, max, nIncrements);
  return scale;
}

function getRangeHTML(name, current, min, max, nIncrements) {
  return (
    '<div class="sliderName">' + name + ':</div>' +
    '<div class="sliderValue">' + current + '</div>' +
    '<div class="minValue">' + min + '</div>' +
    '<div>' +
    '<input type="range" class="slider" ' + //list="' + name + 'tickmarks" ' +
    ' min=' + min + ' max=' + max + ' step =' + Math.round((max-min)/nIncrements) +
    ' onchange="newParameterValue(this)" id=' +
    name +
    ' name=' +
    name +
    " value=" +
    current +
    "> </div>" +  //+getDataList(name, min, max, nIncrements)
    '<div class="maxValue">' + max + '</div>'
  );
}

function getDataList(name, min, max, nIncrements) {
  var htmlText = '<datalist id="' + name + 'tickmarks">'
  for (var i=0; i<nIncrements; i++)
  {
    var value = min + i*(max-min);
    if (i==0 || i==nIncrements-1 || i==Math.round(nIncrements/2))
      htmlText += '<option value="' + value + '" label="' + value + '">';
    else
      htmlText += '<option value="' + value + '">';
  }
  htmlText += '</datalist>';
  return htmlText;
}

function newParameterValue(target) {
  var dbRef = firebase.database().ref('/');
  var updates = {};
  var key = target.name;
  var newParam = newParameters[key];
  if (newParam.type == "number" || newParam.type == "boolean")
    newParam.current = Number(target.value);
  else
    newParam.current = target.value;
  
  var newParamObj = {};
  newParamObj[key] = newParam;

  if (newParam.type == "number") {
    var sliderElement = document.getElementById(key);
    var sliderValueDiv = sliderElement.getElementsByClassName('sliderValue')[0];
    sliderValueDiv.innerHTML = target.value;
  }
  
  dbRef.update(newParamObj);
}
