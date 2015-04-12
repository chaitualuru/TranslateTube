$(document).ready(function() {
	var audio_context;
	var recorder;

	var ref = new Firebase("translatetube.firebaseIO.com");

	var videosRef = ref.child("videos");

	function addVideo(youtube_id, soundcloud_token, language, category) {
		videosRef.push({
			id: youtube_id,
			token: soundcloud_token,
			lang: language,
			cat: category
		});
	}

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
	        	var id = window.location.hash;

	        	var fd = new FormData();    
	        	fd.append( 'file', blob );
	        	fd.append('id', id);

	        	$.ajax({
	        	 	url: 'https://127.0.0.1:5000/',
	        	 	data: fd,
	        	 	processData: false,
	        	 	contentType: false,
	        	 	type: 'POST',
	        	 	success: function(data){
	        	   		document.getElementById("tt_info").innerHTML = "<input type='text' id='textbox' value='https://translatetube.me/" + id.slice(1) + "'></input>";
	        	   		addVideo(id.slice(1), data, 'Arabic', 'general');
	        	 	}
	        	});
	        });
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
});