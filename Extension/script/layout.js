if ($("#tt_container").is(':visible')) {
	console.log("TT is visible. Now hiding.");
	var currentSession = Number(document.getElementById('tt_container').getAttribute('data-session-id'));
	var newSession = (currentSession - 1).toString();
	console.log("TT session: " + newSession);
	document.getElementById('tt_container').setAttribute('data-session-id', newSession);
	$("#tt_container").animate({right:"30px"},200).animate({right:"-330px"},300, function() {
		$("#tt_container").hide();
	});
}
else if ($('#tt_container').is(':hidden')) {
	console.log("TT is hidden. Now making visible again.");
	$("#tt_container").show();
	$("#tt_container").animate({right:"-300px"},0).animate({right:"30px"},300).animate({right:"15px"},200);
	var currentSession = Number(document.getElementById('tt_container').getAttribute('data-session-id'));
	var newSession = (currentSession + 1).toString();
	console.log("TT session: " + newSession);
	document.getElementById('tt_container').setAttribute('data-session-id', newSession);
}
else {
	console.log("TT is being initialized for the first time. Creating TT.");
	var stylesheet = document.createElement('link');
	stylesheet.rel = 'stylesheet';
	stylesheet.href = chrome.extension.getURL('../css/microphone.css');
	document.head.appendChild(stylesheet);

	var div = document.createElement('div');
	var microphone_div = document.createElement('div');
	var text_div = document.createElement('div');
	var result_div = document.createElement('div');
	var info_div = document.createElement('div');
	var sound_container = document.createElement('span');

	div.id = 'tt_container';
	div.setAttribute('data-session-id', '0');
	console.log("Pia session: 0");
	document.body.appendChild(div);

	text_div.id = 'pia_text_div';
	microphone_div.id = 'pia_microphone';
	result_div.id = 'pia_result';
	info_div.id = 'pia_info';
	sound_container.id = 'sound_container';

	div.appendChild(microphone_div);
	div.appendChild(text_div);
	div.appendChild(sound_container);
	text_div.appendChild(result_div);
	text_div.appendChild(info_div);

	$("#tt_container").animate({right:"-300px"},0).animate({right:"30px"},400).animate({right:"15px"},200);
}