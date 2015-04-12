$(document).ready(function() {
	var audio_context;
	var recorder;

	function startUserMedia(stream) {
	  	var input = audio_context.createMediaStreamSource(stream);
	  	recorder = new Recorder(input);
	}

	try {
	    // webkit shim
	    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
	    window.URL = window.URL || window.webkitURL;

	audio_context = new AudioContext;
	} catch (e) {
	    alert('No web audio support in this browser!');
	}

	navigator.getUserMedia({audio: true}, startUserMedia, function(e){});

	document.getElementById("tt_info").innerHTML = "Press the microphone to record.";
	var start_player = document.createElement('audio');
	start_player.id = "short_audio1";
	start_player.src = chrome.extension.getURL("../assets/sounds/start_recording.mp3");
	start_player.type = "audio/mpeg";
	document.body.appendChild(start_player);

	var stop_player = document.createElement('audio');
	stop_player.id = "short_audio2";
	stop_player.src = chrome.extension.getURL("../assets/sounds/stop_recording.mp3");
	stop_player.type = "audio/mpeg";
	document.body.appendChild(stop_player);

	var started = false;
	$(".wit-microphone").click(function() {
		if (started) {
			stop_player.play();
			document.getElementById("tt_info").innerHTML = "Processing...";
			$(".wit-microphone").removeClass("active");
			started = false;

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

	        document.getElementById("tt_info").innerHTML = "Paste URL here.";
		}
		else {
			start_player.play();
			document.getElementById("tt_info").innerHTML = "Recording...";
			$(".wit-microphone").addClass("active");
			started = true;
			recorder && recorder.record();
			console.log("Recording now.");
		}
	});

	// when key is down
	// window.onkeydown = function(e){
	//     // if R is pressed, we start recording
	//     if ( e.keyCode == 82 ){
	//         recorder && recorder.record();
	//         console.log('Recording now...');
	//     // if S is pressed, we stop the recording and package the WAV file
	//     } else if ( e.keyCode == 83 ){
	//         recorder && recorder.stop();
	//         recorder && recorder.exportWAV(function(blob) {
	// 	        console.log('Handing off the file now...');
	// 	        var url = (window.URL || window.webkitURL).createObjectURL(blob);
	// 	        var link = window.document.createElement('a');
	// 	        link.href = url;
	// 	        link.download = 'output.wav';
	// 	        var click = document.createEvent("Event");
	// 	        click.initEvent("click", true, true);
	// 	        link.dispatchEvent(click);
	//         });
	//     }
	// }
});