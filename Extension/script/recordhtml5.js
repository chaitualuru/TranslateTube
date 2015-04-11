var audio_context;
var recorder;

function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  recorder = new Recorder(input);
}

try{
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

audio_context = new AudioContext;
} catch (e) {
    alert('No web audio support in this browser!');
}

navigator.getUserMedia({audio: true}, startUserMedia, function(e){});

var simulateClick = function(element) {
  var dispatchEvent = function (elt, name) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(name, true, true);
    elt.dispatchEvent(clickEvent);
  };
  dispatchEvent(element, 'mouseover');
  dispatchEvent(element, 'mousedown');
  dispatchEvent(element, 'click');
  dispatchEvent(element, 'mouseup');
};

simulateClick(document.getElementsByClassName("ytp-button ytp-button-volume")[0]);

// when key is down
window.onkeydown = function(e){
    // if R is pressed, we start recording
    if ( e.keyCode == 82 ){
        recorder && recorder.record();
        console.log('Recording now...');
    // if S is pressed, we stop the recording and package the WAV file
    } else if ( e.keyCode == 83 ){
        recorder && recorder.stop();

        recorder && recorder.exportWAV(function(blob) {
	        console.log('Handing off the file now...');
	        var url = (window.URL || window.webkitURL).createObjectURL(blob);
	        var link = window.document.createElement('a');
	        link.href = url;
	        link.download = 'output.wav';
	        var click = document.createEvent("Event");
	        click.initEvent("click", true, true);
	        link.dispatchEvent(click);
        });
    }
}