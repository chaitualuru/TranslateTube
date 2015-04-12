if ($("#tt_container").is(':visible')) {
	console.log("tt_container is visible. Now hiding.");
	$("#tt_container").animate({right:"30px"},200).animate({right:"-330px"},300, function() {
		$("#tt_container").hide();
	});
}
else if ($('#tt_container').is(':hidden')) {
	console.log("tt_container is hidden. Now making visible again.");
	$("#tt_container").show();
	$("#tt_container").animate({right:"-300px"},0).animate({right:"30px"},300).animate({right:"15px"},200);
}
else {
	console.log("tt_container is being initialized for the first time. Creating tt.");
	var url = document.URL;	
	var id = /=([a-zA-Z0-9\-_]+)/.exec(url)[1];
	var iframe = document.createElement('iframe');
	iframe.id = "tt_container";
	iframe.src = chrome.extension.getURL("microphone.html") + "#" + id;
	iframe.style.position = 'fixed';
	iframe.style.top = '15px';
	iframe.style.right = '15px';
	iframe.style.height = '100px';
	iframe.style.width = '350px';
	iframe.style.background = '-webkit-linear-gradient(top, #ffffff 0%,#f6f6f6 100%)';
	iframe.style.border = '1px solid rgba(204, 204, 204, 0.5)';
	iframe.style.zIndex = '2147483647';
	iframe.style.overflowY = 'hidden';
	iframe.style.borderRadius = '10px';

	document.body.appendChild(iframe);

	$("#tt_container").animate({right:"-300px"},0).animate({right:"30px"},400).animate({right:"15px"},200);
}

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

// chrome.runtime.onMessage.addListener (function(request, sender, sendResponse) {
//     console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
// 	if (request.greeting == "hello") {
//   		simulateClick(document.getElementsByClassName("ytp-button ytp-button-volume")[0]);
// 		simulateClick(document.getElementsByClassName("ytp-button ytp-button-replay")[0]);
// 	}
// });

// chrome.runtime.onConnect.addListener(function(port) {
//   	console.assert(port.name == "started");
//   	console.log('re');
//   	port.onMessage.addListener(function(msg) {
//     	if (msg.recording == "true") {
//     		console.log("reached here");
//     		simulateClick(document.getElementsByClassName("ytp-button ytp-button-volume")[0]);
// 			simulateClick(document.getElementsByClassName("ytp-button ytp-button-replay")[0]);
//     	}
//     });
// });