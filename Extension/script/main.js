// var simulateClick = function(element) {
//   var dispatchEvent = function (elt, name) {
//     var clickEvent = document.createEvent('MouseEvents');
//     clickEvent.initEvent(name, true, true);
//     elt.dispatchEvent(clickEvent);
//   };
//   dispatchEvent(element, 'mouseover');
//   dispatchEvent(element, 'mousedown');
//   dispatchEvent(element, 'click');
//   dispatchEvent(element, 'mouseup');
// };

// simulateClick(document.getElementsByClassName("ytp-button ytp-button-volume")[0]);
// simulateClick(document.getElementsByClassName("ytp-button ytp-button-play")[0]);

var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL("microphone.html");
iframe.style.position = 'fixed';
iframe.style.top = '50px';
iframe.style.right = '20px';
iframe.style.height = '50px';
iframe.style.width = '50px';
iframe.style.background = 'blue';
iframe.style.zIndex = '9999';

document.body.appendChild(iframe);
