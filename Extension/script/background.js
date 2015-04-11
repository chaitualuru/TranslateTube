chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: "js/jquery-2.1.1.min.js"});
  	chrome.tabs.executeScript(null, {file: "script/main.js"});
});