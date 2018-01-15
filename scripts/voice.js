var grammar = '#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = maya | alisa;'
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

function restart() {
  recognition.start
}

recognition.onresult = function(event) {
  var inputSpeech = event.results[0][0].transcript;
  console.log('Result received: ' + inputSpeech);
  say(inputSpeech);
  //window.setTimeout(restart, 1000);
}

function say(text) {
  var lang = 'en-US';
    /*Check that your browser supports test to speech*/
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      console.log("Your browser supports " + voices.length + " voices");
      console.log(voices);
      msg.voice = voices.filter(function(voice) { return voice.lang == lang; })[1];
    }
    msg.voiceURI = 'native';
    msg.volume = 0.8; // 0 to 1
    msg.rate = 0.9; // 0.1 to 10
    msg.pitch = 0.9; //0 to 2
    msg.text = text;
    msg.lang = lang;
    msg.onend = function(e) {
      console.log('Finished in ' + e.elapsedTime + ' milliseconds.');
    };
    speechSynthesis.speak(msg);
  }
}