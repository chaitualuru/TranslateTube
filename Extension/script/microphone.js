// if (!navigator.getUserMedia) {
// 	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// }
    
// if (navigator.getUserMedia){
//     navigator.getUserMedia({audio:true}, success, function(e) {
//     alert('Error capturing audio.');
//     });
// } else alert('getUserMedia not supported in this browser.');
$(document).ready(function() {
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
		}
		else {
			start_player.play();
			document.getElementById("tt_info").innerHTML = "Recording...";
			$(".wit-microphone").addClass("active");
			started = true;
		}
	});
});